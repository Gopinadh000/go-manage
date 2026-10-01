import { db } from "../db-config/mysql-config.js"
import { ReS } from "../utils/Res.utils.js"



//not using creating with grapghql 
 export const createProject =  async (req, res) => {
    try {
        const { name, description, startDate, endDate } = req.body ?? {}
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

 export const getProjects =  async (req, res) => { 
    res.send("Get ALl Proejcts successfully")
}

 export const getProjectById =  async (req, res) => {
    try {
        const { id } = req.params ?? {}
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//not using creating with grapghql 
 export const updateProject =  async (req, res) => {
    try {
        const { id } = req.params ?? {}
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

 export const deleteProject =  async (req, res) => { 

    try {
        const { id } = req.params ?? {}
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const projectsDataTable = async (req, res)=> {

    const reqQuery = req?.query
    const tenantId = req.tenantId

    const page = Number(reqQuery.page) || 1;
    const pageSize = Number(reqQuery.pageSize) || 20;
      
    const offset = (page - 1) * pageSize;


    const headers = [ 
      {
        fieldName: "select",
        key: "select",
        label: ""
      },
      {
        fieldName: "projectkey",
        key: "projectkey",
        label: "Project Key",
        customCell : true,
      },
      {
        fieldName: "projectName",
        key: "projectName",
        label: "Project Name"
      },
      {
        fieldName: "description",
        key: "description",
        label: "Description"
      },
      {
        fieldName: "tasks_count",
        key: "tasks_count",
        label: "Tasks Count"
      },
      {
        fieldName: "projectOwner",
        key: "projectOwner",
        label: "Project Owner",
        customCell: true,
      },
      {
        fieldName: "status",
        key: "status",
        label: "Status",
        customCell : true
       
      },
      {
        fieldName: "action",
        key: "action",
        label: "Action"
      }
    ]



     const [ projects] = await db.query(`
      SELECT 
      p.id as projectid,
      p.public_id as projectPublicId,
      p.project_name as projectName,
       p.description,
         p.project_key AS projectkey, 
         p.project_status AS status ,
         p.start_date as startDate , 
         p.end_date as endDate ,
         p.created_at,
         p.created_by ,
         JSON_OBJECT( 'id' , u.id,  'value' , u.id , 'label' , u.first_name ) AS  projectOwner
         FROM projects p
         LEFT JOIN users u ON u.id = p.owner_id
         WHERE p.tenant_id = ? 
          LIMIT ? OFFSET ?
         `, [tenantId, pageSize ,offset ])
   
    
     const [countResult] = await db.query(`SELECT COUNT(*) AS totalItems FROM projects  WHERE tenant_id = ? ` , [tenantId]);
     const totalItems = countResult[0].totalItems; 
     const totalPages = Math.ceil(totalItems / pageSize)


    try{
         return ReS(res, {
        status : true,
        statusMessage : "",
        statusCode :200,
        data : {
           headers : headers,
           items :  projects,
           pagination : {
             page,
             pageSize,
             totalItems,
             totalPages,
           }
        }
       
    })

    }catch(err){
        console.error(err)
      return  res.status(500).json({ message: error.message })
    };

}



export const getAllProjectMembers = async(req, res) =>{
    const tenantId = req.tenantId

    try{
       const [projectmembers] = await db.query(
         `SELECT
             public_id AS id,
             CONCAT(first_name, ' ', last_name) AS label,
             id AS value
           FROM users
           WHERE tenant_id = ?
         `,
         [tenantId]
       );
      return ReS(res, { status : true, statusMessage : "", statusCode :200, data : {       members :  projectmembers    }
    })
    }catch(error){
         res.status(500).json({ message: error.message })
    }
}
