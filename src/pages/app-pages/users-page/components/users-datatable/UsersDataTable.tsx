import React from "react";
import DataTable from "../../../../../components/ui/data-table/DataTable";
import { EditOutlined } from "@mui/icons-material";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const UsersDataTable = ({ reloadTable }: any) => {
  const handleEdit = (row: any) => {
    console.log("Edit user:", row);
  };

  const handleDelete = (row: any) => {
    console.log("Delete user:", row);
  };

  return (
    <div className="flex flex-col h-full bg-app-bg">
      <DataTable
        rowKey="userPublicId"
        refreshKey={reloadTable}
        tableUrlConfig={{ pageName: "/users" }}
        customCells={[
          {
            fieldName: "role",
            cell: (value: any, row: any) => <div>{value?.label}</div>,
          },
          {
            fieldName: "status",
            cell: (value: string, row: any) => {
              const isActive = value?.toLowerCase() === "active";
              return (
                <span
                  className={`
                    inline-flex
                    rounded-sm
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    ${
                      isActive
                        ? "bg-app-success-soft text-app-success"
                        : "bg-app-secondary-100 text-app-text-secondary"
                    }
                  `}
                >
                  {value}
                </span>
              );
            },
          },
          {
            fieldName: "action",
            cell: (_value: any, row: any) => (
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
            ),
          },
        ]}
      />
    </div>
  );
};

export default UsersDataTable;
