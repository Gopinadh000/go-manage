import { ReS, ReE } from '../utils/Res.utils.js';
import { db } from '../db-config/mysql-config.js';

export const createTask = async (req, res) => {
  try {
    ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: 'Task created successfully',
      data: {
        taskdata: {
          taskid: '1234567890',
          taskname: 'Task 1',
          taskdescription: 'Task 1 description',
          taskstatus: 'pending',
          taskpriority: 'low',
          taskassignedto: 'John Doe',
        },
      },
    });
  } catch (error) {
    ReE(res, {
      error: error,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: 'All tasks fetched successfully',
      data: {
        taskdata: [],
      },
    });
  } catch (error) {
    ReE(res, {
      error: error,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: 'Task fetched successfully',
      data: {
        taskdata: {},
      },
    });
  } catch (error) {
    ReE(res, {
      error: error,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: 'Task updated successfully',
      data: {
        taskdata: {},
      },
    });
  } catch (error) {
    ReE(res, {
      error: error,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: 'Task deleted successfully',
      data: {
        taskdata: {},
      },
    });
  } catch (error) {
    ReE(res, {
      error: error,
    });
  }
};

export const tasksDataTable = async (req, res) => {
  try {
    const { page: requestedPage = '1', pageSize: requestedPageSize = '20' } =
      req.query;
    const { projectId, assignedToMe } = req.query;
    const tenantId = req.tenantId;

    const page = Number(requestedPage);
    const pageSize = Number(requestedPageSize);

    if (
      !Number.isSafeInteger(page) ||
      page < 1 ||
      !Number.isSafeInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100
    ) {
      return ReE(res, {
        statusCode: 400,
        statusMessage:
          'Page must be positive and pageSize must be between 1 and 100',
      });
    }

    const isProjectQuery = projectId !== undefined;
    const isMyTasksQuery = assignedToMe === 'true';
    if (isProjectQuery === isMyTasksQuery) {
      return ReE(res, {
        statusCode: 400,
        statusMessage: 'Provide either a projectId or assignedToMe=true',
      });
    }

    if (isProjectQuery && !/^\d+$/.test(projectId)) {
      return ReE(res, {
        statusCode: 400,
        statusMessage: 'projectId must be a valid project ID',
      });
    }

    if (isMyTasksQuery && !req.userId) {
      return ReE(res, {
        statusCode: 401,
        statusMessage: 'Authenticated user ID is missing',
      });
    }

    const offset = (page - 1) * pageSize;
    const filterSql = isProjectQuery ? 't.project_id = ?' : 't.assignee_id = ?';
    const filterValue = isProjectQuery ? projectId : req.userId;
    const queryValues = [tenantId, filterValue];

    const headers = [
      { fieldName: 'select', key: 'select', label: '' },
      { fieldName: 'taskName', key: 'taskName', label: 'Task Name' },
      {
        fieldName: 'taskDescription',
        key: 'taskDescription',
        label: 'Description',
      },
      ...(isMyTasksQuery
        ? [{ fieldName: 'projectName', key: 'projectName', label: 'Project' }]
        : []),
      { fieldName: 'priority', key: 'priority', label: 'Priority' },
      { fieldName: 'status', key: 'status', label: 'Status' },
      { fieldName: 'dueDate', key: 'dueDate', label: 'Due Date' },
      { fieldName: 'assignee', key: 'assignee', label: 'Assignee' },
    ];

    const [tasks] = await db.query(
      `
        SELECT
          t.id AS taskId,
          t.task_name AS taskName,
          t.description AS taskDescription,
          p.project_name AS projectName,
          pri.priority_name AS priority,
          ps.status_name AS status,
          DATE_FORMAT(t.end_date, '%Y-%m-%d') AS dueDate,
          CONCAT(u.first_name, ' ', u.last_name) AS assignee
        FROM tasks t
        INNER JOIN projects p
          ON p.id = t.project_id
          AND p.tenant_id = t.tenant_id
        LEFT JOIN app_priorities pri
          ON pri.id = t.priority_id
        LEFT JOIN project_statuses ps
          ON ps.id = t.status_id
        LEFT JOIN users u
          ON u.id = t.assignee_id
          AND u.tenant_id = t.tenant_id
        WHERE t.tenant_id = ?
          AND ${filterSql}
        ORDER BY t.created_at DESC
        LIMIT ? OFFSET ?
        `,
      [...queryValues, pageSize, offset]
    );

    const [countResult] = await db.query(
      `
        SELECT COUNT(*) AS totalItems
        FROM tasks t
        WHERE t.tenant_id = ?
          AND ${filterSql}
        `,
      queryValues
    );

    const totalItems = countResult[0].totalItems;
    const totalPages = Math.ceil(totalItems / pageSize);

    return ReS(res, {
      status: true,
      statusMessage: 'Tasks fetched successfully',
      statusCode: 200,
      data: {
        headers,
        items: tasks,
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error('Failed to fetch tasks table data:', error);
    return ReE(res, {
      error,
      statusMessage: 'Failed to fetch tasks',
    });
  }
};
