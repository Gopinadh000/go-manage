import { db } from '../../db-config/mysql-config.js';
import { generateProjectId } from '../../utils/common.js';

export const getProjectCards = async (context) => {
  const tenantId = context.tenantId;

  const [projects] = await db.query(
    `
            SELECT id , public_id AS publicId , project_name AS name, description, owner_id , project_status AS status  FROM projects WHERE tenant_id =? 
            ORDER BY created_at DESC
            `,
    [tenantId]
  );
  return projects;
};

export const getProjectOptions = async (tenantId) => {
  const [projects] = await db.query(
    `
      SELECT
        id AS id,
        public_id AS value,
        project_name AS label
      FROM projects
      WHERE tenant_id = ?
      ORDER BY project_name ASC
    `,
    [tenantId]
  );

  return getProjectByDatabaseId(result.insertId, tenantId);
};

export const createProject = async ({ input, context }) => {
  const { tenantId, userId } = context;

  const projectPublicId = generateProjectId();

  console.log(context, 'cont');

  const {
    name,
    description,
    key,
    ownerId,
    isPrivate = 0,
    status = 'active',
  } = input;

  const [result] = await db.query(
    `
        INSERT INTO projects (
            public_id,
            tenant_id,
            project_name,
            description,
            project_key,
            owner_id,
            created_by,
            is_private,
            project_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
    [
      projectPublicId,
      tenantId,
      name,
      description ?? null,
      key,
      ownerId,
      userId,
      isPrivate,
      status,
    ]
  );

  const [projects] = await db.query(
    `
        SELECT
            public_id AS id,
            project_name AS name,
            project_key AS \`key\`,
            description,
            project_status AS status,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM projects
        WHERE id = ?
          AND tenant_id = ?
        `,
    [result.insertId, tenantId]
  );

  if (!projects.length) {
    throw new Error('Project was created but could not be fetched');
  }

  return {
    status: true,
    statusMessage: 'Project Created',
    data: projects[0],
  };
};

export const getProjectByDatabaseId = async (databaseId, tenantId) => {
  const [projects] = await db.query(
    `
        SELECT
            p.public_id AS id,
            p.project_name AS name,
            p.project_key AS \`key\`,
            p.description,
            p.project_status AS status,
            p.start_date AS startDate,
            p.end_date AS endDate,
            p.is_private AS isPrivate,
            p.created_at AS createdAt,
            p.updated_at AS updatedAt,

            u.public_id AS ownerId,
            u.first_name AS ownerFirstName,
            u.last_name AS ownerLastName,
            u.profile_pic AS ownerProfilePic,

            r.label AS ownerRole

        FROM projects p

        LEFT JOIN users u
            ON u.id = p.owner_id
            AND u.tenant_id = p.tenant_id

        LEFT JOIN roles r
            ON r.id = u.role_id
            AND r.tenant_id = u.tenant_id

        WHERE p.id = ?
          AND p.tenant_id = ?
        `,
    [databaseId, tenantId]
  );

  if (!projects.length) {
    throw new Error('Project not found');
  }

  return mapProject(projects[0]);
};

export const getProjectByPublicId = async (publicId, tenantId) => {
  const [projects] = await db.query(
    `
        SELECT
            p.public_id AS id,
            p.project_name AS name,
            p.project_key AS \`key\`,
            p.description,
            p.project_status AS status,
            p.start_date AS startDate,
            p.end_date AS endDate,
            p.is_private AS isPrivate,
            p.created_at AS createdAt,
            p.updated_at AS updatedAt,
            u.public_id AS ownerId,
            u.first_name AS ownerFirstName,
            u.last_name AS ownerLastName,
            u.profile_pic AS ownerProfilePic,
            r.name AS ownerRole
        FROM projects p
        LEFT JOIN users u
            ON u.id = p.owner_id
            AND u.tenant_id = p.tenant_id
        LEFT JOIN app_roles r
            ON r.id = u.role_id
            AND r.tenant_id = u.tenant_id
        WHERE p.public_id = ?
          AND p.tenant_id = ?
        `,
    [publicId, tenantId]
  );

  if (!projects.length) {
    throw new Error('Project not found');
  }

  return mapProject(projects[0]);
};

const mapProject = (project) => {
  return {
    id: project.id,
    name: project.name,
    key: project.key,
    description: project.description,
    status: project.status,
    owner: project.ownerId
      ? {
          id: project.ownerId,
          firstName: project.ownerFirstName,
          lastName: project.ownerLastName,
          profilePic: project.ownerProfilePic,
          role: project.ownerRole,
        }
      : null,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

export const updateProject = async ({ tenantId, id, input }) => {
  const updateColumns = {
    name: 'project_name',
    description: 'description',
    startDate: 'start_date',
    endDate: 'end_date',
    isPrivate: 'is_private',
    status: 'project_status',
  };
  const assignments = [];
  const values = [];

  for (const [inputKey, column] of Object.entries(updateColumns)) {
    if (Object.hasOwn(input, inputKey) && input[inputKey] !== undefined) {
      assignments.push(`${column} = ?`);
      values.push(input[inputKey]);
    }
  }

  if (Object.hasOwn(input, 'ownerId') && input.ownerId !== undefined) {
    if (input.ownerId === null) {
      assignments.push('owner_id = NULL');
    } else {
      const [owners] = await db.query(
        `SELECT id FROM users WHERE public_id = ? AND tenant_id = ?`,
        [input.ownerId, tenantId]
      );
      if (!owners.length) {
        throw new Error('Project owner not found');
      }
      assignments.push('owner_id = ?');
      values.push(owners[0].id);
    }
  }

  if (assignments.length === 0) {
    throw new Error('No project fields were provided for update');
  }

  values.push(id, tenantId);
  const [result] = await db.query(
    `
        UPDATE projects
        SET ${assignments.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE public_id = ?
          AND tenant_id = ?
        `,
    values
  );

  if (result.affectedRows === 0) {
    const [projects] = await db.query(
      `SELECT id FROM projects WHERE public_id = ? AND tenant_id = ?`,
      [id, tenantId]
    );
    if (!projects.length) {
      throw new Error('Project not found');
    }
  }

  return getProjectByPublicId(id, tenantId);
};

export const deleteProject = async ({ context, id }) => {
  const tenantId = context.tenantId;
  const [result] = await db.query(
    `
      DELETE FROM projects
      WHERE id = ?
        AND tenant_id = ?
    `,
    [id, tenantId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Project not found');
  }

  return {
    status: true,
    statusMessage: 'Project Deleted Sucessfully!',
  };
};