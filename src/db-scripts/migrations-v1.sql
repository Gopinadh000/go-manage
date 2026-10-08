-- Migration 000: create-migration-history-table
CREATE TABLE IF NOT EXISTS migration_history (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                migration_id VARCHAR(50) NOT NULL,
                migration_name VARCHAR(255) NOT NULL,
                executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_migration_id (migration_id)
            );

-- Migration 001: create-tenants-table
CREATE TABLE IF NOT EXISTS tenants (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                public_id CHAR(12) NOT NULL,
                tenant_name VARCHAR(100) NOT NULL,
                tenant_slug VARCHAR(100) NOT NULL,
                tenant_description VARCHAR(200),
                tenant_status VARCHAR(20) NOT NULL DEFAULT 'active',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_tenant_public_id (public_id),
                UNIQUE KEY uq_tenant_slug (tenant_slug)
            ) AUTO_INCREMENT = 1001;

-- Migration 002: create-app-roles-table
CREATE TABLE IF NOT EXISTS app_roles (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                tenant_id BIGINT UNSIGNED NULL,
                name VARCHAR(50) NOT NULL,
                description VARCHAR(200),
                is_system_role BOOLEAN NOT NULL DEFAULT FALSE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                CONSTRAINT fk_role_tenant
                    FOREIGN KEY (tenant_id)
                    REFERENCES tenants(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 003: insert-app-role-default
INSERT INTO app_roles
                (tenant_id, name, description, is_system_role)
            VALUES
                (
                    NULL,
                    'SUPER_ADMIN',
                    'Full access to the tenant',
                    TRUE
                ),
                (
                    NULL,
                    'MANAGER',
                    'Can manage projects and tasks',
                    TRUE
                ),
                (
                    NULL,
                    'USER',
                    'Can work on assigned projects and tasks',
                    TRUE
                );

-- Migration 004: create-users-table
CREATE TABLE IF NOT EXISTS users (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                public_id CHAR(12) NOT NULL,
                tenant_id BIGINT UNSIGNED NOT NULL,
                role_id BIGINT UNSIGNED NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(150) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                dob DATE,
                address VARCHAR(255),
                state VARCHAR(100),
                city VARCHAR(100),
                pincode VARCHAR(10),
                profile_pic MEDIUMBLOB,
                profile_pic_mime_type VARCHAR(50),
                user_status VARCHAR(20) NOT NULL DEFAULT 'active',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_user_public_id (public_id),
                UNIQUE KEY uq_user_tenant_email (tenant_id, email),
                CONSTRAINT fk_user_tenant
                    FOREIGN KEY (tenant_id)
                    REFERENCES tenants(id),
                CONSTRAINT fk_user_role
                    FOREIGN KEY (role_id)
                    REFERENCES app_roles(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 005: create-app-priorities-table
CREATE TABLE IF NOT EXISTS app_priorities (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                priority_name VARCHAR(30) NOT NULL,
                description VARCHAR(200),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_priority_name (priority_name)
            ) AUTO_INCREMENT = 1001;

-- Migration 006: insert-app-priorities-default
INSERT INTO app_priorities
                (priority_name, description)
            VALUES
                ('LOW', 'Low priority'),
                ('MEDIUM', 'Medium priority'),
                ('HIGH', 'High priority');

-- Migration 007: create-projects-table
CREATE TABLE IF NOT EXISTS projects (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                public_id CHAR(12) NOT NULL,
                tenant_id BIGINT UNSIGNED NOT NULL,
                project_name VARCHAR(100) NOT NULL,
                description VARCHAR(500),
                start_date DATE,
                end_date DATE,
                owner_id BIGINT UNSIGNED NOT NULL,
                created_by BIGINT UNSIGNED NOT NULL,
                is_private TINYINT(1) NOT NULL DEFAULT 0,
                project_status VARCHAR(20) NOT NULL DEFAULT 'active',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_project_public_id (public_id),
                CONSTRAINT fk_project_tenant
                    FOREIGN KEY (tenant_id)
                    REFERENCES tenants(id),
                CONSTRAINT fk_project_owner
                    FOREIGN KEY (owner_id)
                    REFERENCES users(id),
                CONSTRAINT fk_project_created_by
                    FOREIGN KEY (created_by)
                    REFERENCES users(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 008: create-project-members-table
CREATE TABLE IF NOT EXISTS project_members (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                tenant_id BIGINT UNSIGNED NOT NULL,
                project_id BIGINT UNSIGNED NOT NULL,
                user_id BIGINT UNSIGNED NOT NULL,
                joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_project_member (project_id, user_id),
                CONSTRAINT fk_project_member_tenant
                    FOREIGN KEY (tenant_id)
                    REFERENCES tenants(id),
                CONSTRAINT fk_project_member_project
                    FOREIGN KEY (project_id)
                    REFERENCES projects(id),
                CONSTRAINT fk_project_member_user
                    FOREIGN KEY (user_id)
                    REFERENCES users(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 009: create-project-statuses-table
CREATE TABLE IF NOT EXISTS project_statuses (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                project_id BIGINT UNSIGNED NOT NULL,
                status_name VARCHAR(50) NOT NULL,
                status_category VARCHAR(30) NOT NULL,
                description VARCHAR(100),
                display_order INT UNSIGNED NOT NULL DEFAULT 0,
                is_default BOOLEAN NOT NULL DEFAULT FALSE,
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_project_status_name
                    (project_id, status_name),
                CONSTRAINT fk_project_status_project
                    FOREIGN KEY (project_id)
                    REFERENCES projects(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 010: create-app-task-types-table
CREATE TABLE IF NOT EXISTS app_task_types (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                type_name VARCHAR(30) NOT NULL,
                description VARCHAR(200),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_task_type_name (type_name)
            ) AUTO_INCREMENT = 1001;

-- Migration 011: insert-app-task-types-default
INSERT INTO app_task_types
                (type_name, description)
            VALUES
                (
                    'BUG',
                    'A defect or issue that needs to be fixed'
                ),
                (
                    'STORY',
                    'A user-focused requirement or piece of work'
                ),
                (
                    'FEATURE',
                    'A new product or application capability'
                ),
                (
                    'EPIC',
                    'A large body of work containing multiple tasks'
                );

-- Migration 012: create-tasks-table
CREATE TABLE IF NOT EXISTS tasks (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                public_id CHAR(12) NOT NULL,
                tenant_id BIGINT UNSIGNED NOT NULL,
                project_id BIGINT UNSIGNED NOT NULL,
                parent_task_id BIGINT UNSIGNED NULL,
                task_name VARCHAR(150) NOT NULL,
                task_type_id BIGINT UNSIGNED NOT NULL,
                priority_id BIGINT UNSIGNED NOT NULL,
                status_id BIGINT UNSIGNED NOT NULL,
                assignee_id BIGINT UNSIGNED NULL,
                created_by BIGINT UNSIGNED NOT NULL,
                description TEXT,
                start_date DATE,
                end_date DATE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_task_public_id (public_id),
                CONSTRAINT fk_task_tenant
                    FOREIGN KEY (tenant_id)
                    REFERENCES tenants(id),
                CONSTRAINT fk_task_project
                    FOREIGN KEY (project_id)
                    REFERENCES projects(id),
                CONSTRAINT fk_task_parent
                    FOREIGN KEY (parent_task_id)
                    REFERENCES tasks(id),
                CONSTRAINT fk_task_type
                    FOREIGN KEY (task_type_id)
                    REFERENCES app_task_types(id),
                CONSTRAINT fk_task_priority
                    FOREIGN KEY (priority_id)
                    REFERENCES app_priorities(id),
                CONSTRAINT fk_task_status
                    FOREIGN KEY (status_id)
                    REFERENCES project_statuses(id),
                CONSTRAINT fk_task_assignee
                    FOREIGN KEY (assignee_id)
                    REFERENCES users(id),
                CONSTRAINT fk_task_created_by
                    FOREIGN KEY (created_by)
                    REFERENCES users(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 013: alter-tasks-table-auto-increment
ALTER TABLE tasks
            AUTO_INCREMENT = 1001;

-- Migration 014: create-task-comments-table
CREATE TABLE IF NOT EXISTS task_comments (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                task_id BIGINT UNSIGNED NOT NULL,
                user_id BIGINT UNSIGNED NOT NULL,
                parent_comment_id BIGINT UNSIGNED NULL,
                comment TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                CONSTRAINT fk_task_comment_task
                    FOREIGN KEY (task_id)
                    REFERENCES tasks(id),
                CONSTRAINT fk_task_comment_user
                    FOREIGN KEY (user_id)
                    REFERENCES users(id),
                CONSTRAINT fk_task_comment_parent
                    FOREIGN KEY (parent_comment_id)
                    REFERENCES task_comments(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 015: create-task-history-table
CREATE TABLE IF NOT EXISTS tasks_history (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                task_id BIGINT UNSIGNED NOT NULL,
                user_id BIGINT UNSIGNED NOT NULL,
                action_type VARCHAR(50) NOT NULL,
                field_name VARCHAR(50),
                old_value TEXT,
                new_value TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                CONSTRAINT fk_task_history_task
                    FOREIGN KEY (task_id)
                    REFERENCES tasks(id),
                CONSTRAINT fk_task_history_user
                    FOREIGN KEY (user_id)
                    REFERENCES users(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 017: create-app-permissions-table
CREATE TABLE IF NOT EXISTS app_permissions (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                permission_name VARCHAR(100) NOT NULL,
                description VARCHAR(200),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_permission_name
                    (permission_name)
            ) AUTO_INCREMENT = 1001;

-- Migration 018: create-role-permissions-table
CREATE TABLE IF NOT EXISTS role_permissions (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                role_id BIGINT UNSIGNED NOT NULL,
                permission_id BIGINT UNSIGNED NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_role_permission
                    (role_id, permission_id),
                CONSTRAINT fk_role_permission_role
                    FOREIGN KEY (role_id)
                    REFERENCES app_roles(id),
                CONSTRAINT fk_role_permission_permission
                    FOREIGN KEY (permission_id)
                    REFERENCES app_permissions(id)
            ) AUTO_INCREMENT = 1001;

-- Migration 019: insert-super-admin-role-permissions-default
INSERT INTO role_permissions
                (role_id, permission_id)
            SELECT
                1001,
                id
            FROM app_permissions;

-- Migration 020: insert-manager-role-permissions-default
INSERT INTO role_permissions
                (role_id, permission_id)
            SELECT
                1002,
                id
            FROM app_permissions
            WHERE permission_name IN (
                'users:view',
                'projects:view',
                'projects:create',
                'projects:update',
                'projects:delete',
                'projects:members:view',
                'projects:members:add',
                'projects:members:remove',
                'tasks:view',
                'tasks:create',
                'tasks:update',
                'tasks:delete',
                'tasks:comments:view',
                'tasks:comments:create',
                'tasks:comments:update',
                'tasks:comments:delete',
                'tasks:history:view'
            );

-- Migration 021: insert-user-role-permissions-default
INSERT INTO role_permissions
                (role_id, permission_id)
            SELECT
                1003,
                id
            FROM app_permissions
            WHERE permission_name IN (
                'users:view',
                'projects:view',
                'projects:create',
                'tasks:view',
                'tasks:update',
                'tasks:comments:view',
                'tasks:comments:create',
                'tasks:history:view'
            );

-- Migration 022: update-projects-table-key-field
ALTER TABLE projects
        ADD COLUMN project_key VARCHAR(5) NULL
        AFTER project_name;

