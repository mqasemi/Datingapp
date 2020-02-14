export interface Paginations {
    currentPage: number;
    itemPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginationResult<T>{
    result: T;
    pagination: Paginations;
}
