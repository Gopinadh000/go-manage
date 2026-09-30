import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";
import { EditOutlined } from "@mui/icons-material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useGraphQL } from "../../../../../services/api/useGrapghQL";
import { DELETE_PROJECT_MUTATION } from "../../../../../graphql/mutations/project.mutations";

const ProjectsDataTable = ({ refreshKey, reloadTable }) => {
  const { execute, loading, error } = useGraphQL();

   const handleEdit = (row: any) => {
    console.log("Edit user:", row);
  };

  const handleDelete =  async (row: any) => {

    try{
      const projectid = row?.projectid
      const result = await execute(DELETE_PROJECT_MUTATION , {id : projectid });
      const resData = result.deleteProject.status 
      if(!resData){
        console.info(resData.statusMessage)
      }
        console.info(resData.statusMessage)
        reloadTable()
    }catch(error){
      console.error("Delete Project Failed", error)
    }
  };

  return (
    <div className="flex flex-col h-full bg-app-bg ">
      <DataTable
        tableUrlConfig={{ pageName: "/projects" }}
        rowKey="projectid"
        refreshKey={refreshKey}
        customCells={[
          {
            fieldName: "projectkey",
            cell: (value: any, row: any) => {
              return (
                <a
                  href="/"
                  className="text-app-primary-900 hover:text-underline! cursor-pointer"
                >
                  {value}
                </a>
              );
            },
          },
          {
            fieldName: "projectOwner",
            cell: (value: any, row: any) => {
              return (
                <div key={value?.id}>
                  <span>{value?.label}</span>
                </div>
              );
            },
          },
          {
            fieldName : "action",
            cell : (value :any, row :any) => {
              return (
                <div className="flex items-center gap-1 group-hover:opacity-100 ">
                               <button
                                 type="button"
                                 title="Edit user"
                                 onClick={() => handleEdit(row)}
                                 className="
                                   flex
                                   h-8
                                   w-8
                                   items-center
                                   justify-center
                                   rounded-md
                                   text-app-text-muted
                                   transition-colors
                                   hover:bg-app-primary-50
                                   hover:text-app-primary-500
                                   cursor-pointer
                                 "
                               >
                                 <EditOutlined sx={{ fontSize: 18 }} />
                               </button>
               
                               {/* Delete */}
                               <button
                                 type="button"
                                 title="Delete user"
                                 onClick={() => handleDelete(row)}
                                 className="
                                   flex
                                   h-8
                                   w-8
                                   items-center
                                   justify-center
                                   rounded-md
                                   text-app-text-muted
                                   hover:bg-app-error-soft
                                   hover:text-app-error
                                   opacity-0
                                   transition-opacity
                                   duration-150
                                   group-hover:opacity-100
                                 "
                               >
                                 <DeleteOutlineOutlined sx={{ fontSize: 18 }} />
                               </button>
                             </div>
              )
            }
          }
        ]}
      />
    </div>
  );
};

export default ProjectsDataTable;
