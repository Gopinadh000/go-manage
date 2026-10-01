import { db } from "../../db-config/mysql-config.js";
import { getProjectOptions , getProjectCards , createProject , deleteProject} from "../services/project.service.js";


const projectResolver = {
    Query : {
        projectCards : async (parent , args  , context , info) => {
          const tenantId = context.tenantId;
          const [projects] = await db.query(`
            SELECT id , public_id AS publicId , project_name AS name, description, owner_id , project_status AS status  FROM projects WHERE tenant_id =? 
            ORDER BY created_at DESC
            `, [tenantId]);

          return projects;
       },

        projectOptions : async (_, __, context) => {
         return getProjectCards(context.tenantId);
        },
    },

    Mutation : {
        createProject: async (_,  { input }, context) => {
          return await createProject({input,context });
        },

        updateProject: async (_, { id, input }, context) => {
          return updateProject({
            tenantId: context.tenantId,
            id,
            input,
          });
        },

        deleteProject: async (_, { id }, context) => {
          return deleteProject({
            context,
            id,
          });
        },
    }
}

export default projectResolver;