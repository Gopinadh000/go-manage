import { ReS, ReE } from "../utils/Res.utils.js";
import { db, executeTransaction } from "../db-config/mysql-config.js";
import { generateUserId, generateTenantId } from "../utils/common.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();
import {
  setAuthCookie,
  clearAuthCookie,
  generateJWTAccesToken,
} from "../middlewares/jwt/jwtToken.js";

const saltRounds = 10;

/** Shared shape returned by login + /auth/me so the UI can hydrate the same way */
const buildUserSessionData = async (userRow) => {
  const {
    first_name,
    last_name,
    public_id,
    user_status,
    tenant_id,
    role_id,
    email,
    id
  } = userRow;

  const [userTenantData] = await db.query(
    "SELECT * FROM tenants WHERE id = ?",
    [tenant_id],
  );

  if (!userTenantData?.length) {
    throw new Error("Tenant not found for user");
  }

  const [userPermissions] = await db.query(
    `SELECT ap.permission_name
     FROM role_permissions rp
     JOIN app_permissions ap ON rp.permission_id = ap.id
     WHERE rp.role_id = ?`,
    [role_id],
  );

  const {
    public_id: tenantPublicId,
    tenant_name,
    tenant_slug,
  } = userTenantData[0];

  return {
    userId : id,
    firstName: first_name,
    lastName: last_name,
    userPublicId: public_id,
    userStatus: user_status,
    email,
    userRoleId: role_id,
    tenantId: tenant_id,
    tenantPublicId : tenantPublicId,
    tenantName: tenant_name,
    tenantSlug: tenant_slug,
    userpermissions: userPermissions.map((p) => p.permission_name),
  };
};

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, tenant_name } = req.body ?? {};

  try {
    const tenantPublicId = generateTenantId();
    const userPublicId = generateUserId();

    if (!firstname || !lastname || !email || !password || !tenant_name) {
      return ReE(res, {
        error: "All fields are required",
        status: false,
        statusCode: 400,
        statusMessage: "All fields are required",
      });
    }

    const convertToSlug = (text) => text.trim().replace(/\s+/g, "-");
    const tenantSlugName = convertToSlug(tenant_name);

    const [tenantRows] = await db.query(
      `SELECT public_id, tenant_name
       FROM tenants
       WHERE tenant_name = ? OR tenant_slug = ?`,
      [tenant_name, tenantSlugName],
    );

    if (tenantRows.length > 0) {
      return ReE(res, {
        error: "Company already exists. Please use a different company name.",
        status: false,
        statusCode: 400,
        statusMessage: "Company already exists",
      });
    }

    const [existingUsers] = await db.query(
      "SELECT email, public_id FROM users WHERE email = ?",
      [email],
    );

    if (existingUsers.length > 0) {
      return ReE(res, {
        error: "User with this email already exists",
        status: false,
        statusCode: 400,
        statusMessage: "User with this email already exists",
      });
    }

    const [roleRows] = await db.query(
      "SELECT id FROM app_roles WHERE name = ? AND is_system_role = TRUE LIMIT 1",
      ["SUPER_ADMIN"],
    );

    if (roleRows.length === 0) {
      return ReE(res, {
        error: "Default SUPER_ADMIN role is missing",
        status: false,
        statusCode: 500,
        statusMessage: "Something Went Wrong",
      });
    }

    const superAdminRoleId = roleRows[0].id;

    await executeTransaction(async (db2) => {
      const [tenantResult] = await db2.query(
        "INSERT INTO tenants (public_id, tenant_name, tenant_slug) VALUES (?, ?, ?)",
        [tenantPublicId, tenant_name, tenantSlugName],
      );

      const tenantId = tenantResult.insertId;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      await db2.query(
        "INSERT INTO users (public_id, tenant_id, role_id, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [userPublicId, tenantId, superAdminRoleId, firstname, lastname, email, hashedPassword],
      );
    });

    return ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: "User registered successfully",
      data: {
        tenant_public_id: tenantPublicId,
        user_public_id: userPublicId,
        email,
      },
    });
  } catch (error) {
    ReE(res, {
      error: error?.message,
    });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};

  console.log(req.body , "req body")

  try {
    if (!email || !password) {
      return ReE(res, { message: "Email and password are required" });
    }

    // 1. Find user by email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return ReE(res, { statusMessage: "User Not Found with this email" });
    }

    const passwordHashed = users[0].password_hash;

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, passwordHashed);
    if (!isMatch) {
      return ReE(res, { statusMessage: "Incorrect Password. Please Check!" });
    }

    const userData = await buildUserSessionData(users[0]);

    console.log(userData , "ud")

    const jwtPayload = {
      userId : userData.userId,
      userRoleId: userData.userRoleId,
      userPublicId: userData.userPublicId,
      tenantId: userData.tenantId,
      tenantPublicId : userData.tenantPublicId
    };

    const jwtToken = generateJWTAccesToken(jwtPayload);
    setAuthCookie(res, jwtToken);

    return ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: "User logged in successfully",
      data: userData,
    });
  } catch (error) {
    return ReE(res, {
      statusMessage: error?.message || "Login failed",
    });
  }
};



/**
 * GET /auth/me
 * Why this exists: the JWT lives in an httpOnly cookie, so JavaScript
 * cannot read it. After a page refresh React state is empty — the UI
 * must ask the backend "who am I?" using the cookie the browser sends.
 */
export const getCurrentUser = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE public_id = ?",
      [req.userPublicId],
    );

    if (!users.length) {
      clearAuthCookie(res);
      return ReE(res, {
        statusMessage: "User not found",
        statusCode: 401,
        status: false,
      });
    }

    const userData = await buildUserSessionData(users[0]);

    return ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: "Authenticated",
      data: userData,
    });
  } catch (error) {
    return ReE(res, {
      statusMessage: error?.message || "Failed to load session",
    });
  }
};

/** POST /auth/logout — clear the auth cookie so refresh stays logged out */
export const logoutUser = async (req, res) => {
  clearAuthCookie(res);
  return ReS(res, {
    status: true,
    statusCode: 200,
    statusMessage: "Logged out successfully",
    data: {},
  });
};


export const forgotPassword = async (req, res) => {
  try {
    return ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: "Password reset successfully",
      data: {},
    });
  } catch (error) {
    return ReE(res, {
      error: error,
    });
  }
};
