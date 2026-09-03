import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";
import usersdata from "../../mock-data.json"

const UsersDataTable = () => {
  return <div className="flex flex-col h-full bg-app-bg">
      <DataTable rowKey="userPublicId"  headers={usersdata.data.headers}  items={usersdata.data.items}/>
  </div>;
};

export default UsersDataTable;
