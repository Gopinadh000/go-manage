import React, { useState } from "react";
import type { DataTableProps } from "./datatable.types.tsx";
import TablePagination from "./components/TablePagination.tsx";

const DataTable = ({ headers, items, rowKey }: DataTableProps) => {
  const [tableData, setTableData] = useState({
    headers: [],
    items: [],
    pagination: {
      page: 1,
      pageSize: 20,
      totalItems: 100,
      totalPages: Math.ceil(100 / 20),
    },
    isdownload: false,
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(items.map((item) => item[rowKey]));
    } else {
      setSelectedRows([]);
    }
  };

  const handlePageChange = (page: number) => {
    setTableData((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        page,
      },
    }));
  };

  return (
    <div className="h-full min-h-0 flex flex-col bg-app-surface p-3 rounded-md custom-scrollbar">
      <div className="flex-1 min-h-0 overflow-auto border rounded-t-sm border-app-border overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-app-surface  shadow-sm">
            <tr className="h-12 border-b border-app-border">
              {headers.map((header) => (
                <th
                  key={header.key}
                  className={`px-4 py-3 text-left text-sm font-medium ${
                    header.key === "select"
                      ? "w-[50px] min-w-[50px] max-w-[50px]"
                      : "min-w-[220px]"
                  }`}
                >
                  {header.key === "select" ? (
                    <input
                      className="w-4 h-4 rounded-none outline-none checked:bg-app-primary-50"
                      type="checkbox"
                      checked={
                        items.length > 0 && selectedRows.length === items.length
                      }
                      onChange={handleSelectAll}
                    />
                  ) : (
                    header.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item[rowKey]}
                className="border-b border-app-border hover:bg-app-bg"
              >
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className="px-4 py-3 text-sm  text-app-text"
                  >
                    {header.key === "select" ? (
                      <input
                        className="w-4 h-4 rounded-none outline-none checked:bg-app-primary-50"
                        type="checkbox"
                        checked={selectedRows.includes(item[rowKey])}
                        onChange={() => handleSelectRow(item[rowKey])}
                      />
                    ) : (
                      (item[header.key] ?? "")
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        pagination={tableData.pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DataTable;
