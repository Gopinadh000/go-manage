import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";

const UsersDataTable = ({reloadTable}:any) => {
  return (
    <div className="flex flex-col h-full bg-app-bg">
      <DataTable
        rowKey="userPublicId"
        refreshKey={reloadTable}
        tableUrlConfig={{ pageName: "/users" }}
         customCells={[
           {
    fieldName: "role",
    cell: (value: any, row: any) => (
      <div>
        {value?.label}
      </div>
    ),
  },
  {
    fieldName: "status",
    cell: (value: string) => (
      <div>
        {value}
      </div>
    ),
  },
  {
    fieldName: "action",
    cell: (_value: any, row: any) => (
      <div>
        Edit
      </div>
    ),
  },


         ]}
      />
    </div>
  );
};

export default UsersDataTable;
