
import { ReE , ReS } from "../utils/Res.utils.js";
import bcrypt from "bcryptjs";
import { generateUserId } from "../utils/common.js";
import { db } from "../db-config/mysql-config.js";

const saltRounds = 10;

export const createUserInTenant = async (req, res) => {


    const { firstName,  lastName, email,  dob, role} = req.body || {}

    if(!firstName || !lastName || !email || !dob || !role){
        return ReE(res, {
                error: "All fields are required",
                status: false,
                statusCode: 400,
                statusMessage: "All fields are required",
        });
    };
   
   try {
     const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const formattedLastName = lastName.charAt(0).toLowerCase() + lastName.slice(1).toLowerCase();
    const dobYear = new Date(dob).getFullYear();

    const password = `${formattedFirstName}${formattedLastName}@${dobYear}`;

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const userPublicId = generateUserId();
    const userTenantId = req.tenantId
    const roleId = role

    await db.query(
        "INSERT INTO users ( public_id,  tenant_id , role_id , first_name, last_name , email , password_hash ) VALUES (? , ?, ? , ? ,?, ?, ?)",
        [
          userPublicId,
          userTenantId,
          roleId,
          firstName,
          lastName,
          email,
          hashedPassword,
        ],
      );

     return ReS(res, {
      status: true,
      statusCode: 200,
      statusMessage: "User registered successfully",
    });

   }catch(error){
    return   ReE(res, {
      error: error?.message,
     });
   }

    







};


export const  getUsersTable = async (req, res)=>{

   const reqQuery = req.query
   try{

    const tenantId = req.tenantId

    const page = Number(reqQuery.page) || 1;
    const pageSize = Number(reqQuery.pageSize) || 5;

    const offset = (page - 1) * pageSize

    const [ users] = await db.query(`
      SELECT 
       u.id as userid,
       u.public_id AS userPublicId,
        u.first_name AS firstName,
        u.last_name AS lastName,
        u.email,
        u.role_id AS role,
        u.user_status AS status,
        JSON_OBJECT( 'id' , r.id,  'value' , r.id , 'label' , r.name ) AS role
      FROM users u
      LEFT JOIN app_roles r ON r.id = u.role_id
      WHERE u.tenant_id = ? 
      LIMIT ? OFFSET ?` ,
     [tenantId , pageSize , offset]
    )

    const [countResult] = await db.query(`SELECT COUNT(*) AS totalItems FROM users  WHERE tenant_id = ? ` , [tenantId]);

    const totalItems = countResult[0].totalItems; 

    const totalPages = Math.ceil(totalItems / pageSize)

    const headers = [ 
      {
        fieldName: "select",
        key: "select",
        label: ""
      },
      {
        fieldName: "firstName",
        key: "firstName",
        label: "First Name"
      },
      {
        fieldName: "lastName",
        key: "lastName",
        label: "Last Name"
      },
      {
        fieldName: "email",
        key: "email",
        label: "Email"
      },
      {
        fieldName: "role",
        key: "role",
        label: "Role",
        customCell: true,
      },
      {
        fieldName: "status",
        key: "status",
        label: "Status",
       
      },
      {
        fieldName: "action",
        key: "action",
        label: "Action"
      }
    ]


    return ReS(res, {
        status : true,
        statusMessage : "",
        statusCode :200,
        data : {
           headers : headers,
           items : users,
           pagination : {
             page,
             pageSize,
             totalItems,
             totalPages
           }
        }
       
    })


   }catch(error){
    console.error(error);
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Failed to fetch users"
    });
   }

};
