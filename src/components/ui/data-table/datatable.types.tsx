
export interface DataTableHeader {
    key : string;
    label :string;
};

export interface DataTablePagination {
    page: number;
    pageSize : number;
    totalCount : number;
};

export interface DataTableProps {
    headers? : DataTableHeader ;
    items? : Record<string ,any>[];
    rowKey : string;
    pagination? :DataTablePagination;
    onPageChange? : (page : number)=> void;
    onPageSizeChange? : (pageSize : number) => void;
};
