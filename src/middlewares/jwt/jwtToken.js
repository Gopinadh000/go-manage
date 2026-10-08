import dotenv from 'dotenv';
dotenv.config();
import { ReE } from '../../utils/Res.utils.js';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.APP_JWT_SECRET_KEY;
const JWT_EXPIRES_IN = '60m';
export const AUTH_COOKIE_KEY = 'go_manage_auth_token';

// Secure cookies only work over HTTPS. On localhost (HTTP) the browser
// silently drops cookies if secure:true — that breaks login persistence.
const isProd = (process.env.APP_ENV || '').toUpperCase() === 'PRODUCTION';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax',
  path: '/',
};

export const generateJWTAccesToken = (payloadUser) => {
  return jwt.sign(payloadUser, JWT_KEY, { expiresIn: JWT_EXPIRES_IN });
};

export const setAuthCookie = (res, token) => {
  return res.cookie(AUTH_COOKIE_KEY, token, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
};

export const clearAuthCookie = (res) => {
  // clearCookie options must match how the cookie was set
  return res.clearCookie(AUTH_COOKIE_KEY, cookieOptions);
};

export const cookieTokenAuth = (req, res, next) => {
  const token = req.cookies?.[AUTH_COOKIE_KEY];

  if (!token) {
    return ReE(res, {
      statusMessage: 'Authentication is required',
      statusCode: 401,
      status: false,
    });
  }

  try {
    const data = jwt.verify(token, JWT_KEY);
    req.userPublicId = data.userPublicId;
    req.tenantId = data.tenantId;
    req.tenantPublicId = data.tenantPublicId;
    req.userRoleId = data.userRoleId;
    req.userId = data.userId;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ReE(res, {
        statusMessage: 'Token has expired',
        statusCode: 401,
        status: false,
      });
    }

    return ReE(res, {
      statusMessage: 'Invalid or expired token',
      statusCode: 401,
      status: false,
    });
  }
};
