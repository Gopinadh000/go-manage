import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";
import { EditOutlined } from "@mui/icons-material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useGraphQL } from "../../../../../services/api/useGrapghQL";
import { DELETE_PROJECT_MUTATION } from "../../../../../graphql/mutations/project.mutations";
import { Link } from "react-router-dom";

type ProjectRow = Record<string, unknown>;

const getText = (row: ProjectRow, ...keys: string[]) => {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }
  return "";
};

const ProjectTaskLink = ({ value, row }: { value: unknown; row: ProjectRow }) => {
  const projectId = getText(row, "projectPublicId", "projectpublicid", "projectid", "id");
  const projectName = getText(row, "projectName", "projectname", "name") || String(value ?? "Project");
  const projectDescription = getText(row, "description", "projectDescription", "projectdescription");

  return (
    <Link
      to={`/projects/${encodeURIComponent(projectId)}/tasks`}
      state={{ projectName, projectDescription }}
      className="cursor-pointer text-app-primary-900 hover:underline"
    >
      {String(value ?? "")}
    </Link>
  );
};

const ProjectsDataTable = ({ refreshKey, reloadTable }) => {
  const { execute } = useGraphQL();

   const handleEdit = (row: ProjectRow) => {
    console.log("Edit user:", row);
  };

  const handleDelete =  async (row: ProjectRow) => {

    try{
      const projectid = row.projectid
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
            cell: (value: unknown, row: ProjectRow) => <ProjectTaskLink value={value} row={row} />,
          },
          {
            fieldName: "projectName",
            cell: (value: unknown, row: ProjectRow) => <ProjectTaskLink value={value} row={row} />,
          },
          {
            fieldName: "projectOwner",
            cell: (value: unknown, row: ProjectRow) => {
              const owner = typeof value === "object" && value !== null && "label" in value
                ? String(value.label ?? "")
                : "";
              return (
                <div key={getText(row, "projectid")}>
                  <span>{owner}</span>
                </div>
              );
            },
          },
          {
            fieldName : "action",
            cell : (value: unknown, row: ProjectRow) => {
              void value;
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
