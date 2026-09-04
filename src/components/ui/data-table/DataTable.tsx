import React, { useEffect, useState } from "react";
import type { DataTableProps } from "./datatable.types.tsx";
import TablePagination from "./components/TablePagination.tsx";
import { useApi } from "../../../services/api/useApi.ts";

const DataTable = ({
  rowKey,
  tableUrlConfig,
  refreshKey,
  customCells,
}: DataTableProps) => {
  const { pageName, payloadParams } = tableUrlConfig;

  const baseUrl = `${pageName}/table`;
  const { GET } = useApi();

  const [tableData, setTableData] = useState({
    headers: [],
    items: [],
    pagination: {
      page: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
    isdownload: false,
  });

  const { headers, items, pagination } = tableData;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  console.log(pagination, "pagination");

  const fetchTableData = async (page: number) => {
    try {
      const params = new URLSearchParams(payloadParams || "");

      params.set("page", String(page));
      params.set("pageSize", String(pagination.pageSize || 10));

      const queryString = params.toString();

      const resData = await GET(`${baseUrl}?${queryString}`);

      if (!resData?.status) {
        console.error(resData?.statusMessage);
        return;
      }

      const responseData = resData.data;
      setTableData(responseData);
      setSelectedRows([]);
    } catch (error) {
      console.error("Failed to fetch table data:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTableData(pagination.page);
  }, [refreshKey]);

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

  const getCustomCell = (fieldName: string) => {
    return customCells?.find((cell) => cell.fieldName === fieldName);
  };

  return (
    <div className="h-full min-h-0 flex flex-col bg-app-surface p-3 rounded-md custom-scrollbar">
      <div className="flex-1 min-h-0 overflow-auto border rounded-t-sm border-app-border overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-app-surface  shadow-sm">
            <tr className="h-12 border-b border-app-border">
              {tableData.headers.map((header) => (
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
            {items?.map((item) => (
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
                    ) : getCustomCell(header.key) ? (
                      getCustomCell(header.key)!.cell(item[header.key], item)
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
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DataTable;
