import React from "react";
export interface DataTableHeader {
    key : string;
    label :string;
    fieldName :string;
};

export interface DataTablePagination {
    page: number;
    pageSize : number;
    totalCount : number;
};


export interface TableUrlConfigProps {
    pageName : string;
    payloadParams?: string;
}

export interface CustomCell {
  fieldName: string;
  cell: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}


export interface DataTableProps {
    headers? : DataTableHeader ;
    items? : Record<string, unknown>[];
    rowKey : string;
    pagination? :DataTablePagination;
    onPageChange? : (page : number)=> void;
    onPageSizeChange? : (pageSize : number) => void;
    tableUrlConfig : TableUrlConfigProps;
    refreshKey : string;
    customCells?: CustomCell[];
};
