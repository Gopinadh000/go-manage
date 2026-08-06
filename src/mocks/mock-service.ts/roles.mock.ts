// roles.mock.ts
import { APP_PERMISSONS } from "./permission.mock";


export const user_with_roles = [
  {
    id: 1,
    name: "SUPER_ADMIN",
    permissions: APP_PERMISSONS,
  },

  {
    id: 2,
    name: "MANAGER",
    permissions: [
      "dashboard.view",

      "projects.view",
      "projects.create",
      "projects.edit",

      "tasks.view",
      "tasks.create",
      "tasks.edit",
    ],
  },

  {
    id: 3,
    name: "MEMBER",
    permissions: [
      "dashboard.view",

      "projects.view",

      "tasks.view",
      "tasks.edit",
    ],
  },
];