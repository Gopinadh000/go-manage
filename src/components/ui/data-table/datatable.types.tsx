import React from "react";
export interface DataTableHeader {
    key : string;
    label :string;
};

export interface DataTablePagination {
    page: number;
    pageSize : number;
    totalCount : number;
};


export interface TableUrlConfigProps {
    pageName : string;
}

export interface CustomCell {
  fieldName: string;
  cell: ( value: any, row: any) => React.ReactNode;
}


export interface DataTableProps {
    headers? : DataTableHeader ;
    items? : Record<string ,any>[];
    rowKey : string;
    pagination? :DataTablePagination;
    onPageChange? : (page : number)=> void;
    onPageSizeChange? : (pageSize : number) => void;
    tableUrlConfig : TableUrlConfigProps;
    refreshKey : string;
    customCells?: CustomCell[];
};
