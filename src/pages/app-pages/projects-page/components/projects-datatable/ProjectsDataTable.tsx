import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";

const ProjectsDataTable = () => {
  return  (
     <div className="flex flex-col h-full bg-app-bg ">
        <DataTable  tableUrlConfig={{ pageName: "project" }} rowKey={""} refreshKey={""}/>
     </div>
  )
};

export default ProjectsDataTable;
