import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";

const ProjectsDataTable = ({refreshKey }) => {
  return (
    <div className="flex flex-col h-full bg-app-bg ">
      <DataTable
        tableUrlConfig={{ pageName: "/projects" }}
        rowKey={""}
        refreshKey={refreshKey}
        customCells={
         [
            {
               fieldName : "projectkey",
                cell: (value: any, row: any) => {
                  return <a href="/" className="text-app-primary-900 hover:text-underline! cursor-pointer">{value}</a>
                }
            }
         ]
        }
      />
    </div>
  );
};

export default ProjectsDataTable;
