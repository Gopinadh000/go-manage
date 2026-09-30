import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";

const ProjectsDataTable = ({refreshKey }) => {

  return (
    <div className="flex flex-col h-full bg-app-bg ">
      <DataTable
        tableUrlConfig={{ pageName: "/projects" }}
        rowKey="projectid"
        refreshKey={refreshKey}
        customCells={
         [
            {
               fieldName : "projectkey",
                cell: (value: any, row: any) => {
                  return <a href="/" className="text-app-primary-900 hover:text-underline! cursor-pointer">{value}</a>
                }
            },
            {
               fieldName : "projectOwner",
               cell : (value :any , row: any)=>{
                  return (
                     <div key={value?.id}>
                        <span>
                           {value?.label}
                        </span>
                     </div>
                  )
               }
            }
         ]
        }
      />
    </div>
  );
};

export default ProjectsDataTable;
