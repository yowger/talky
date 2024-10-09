export interface PaginationOptions {
    page: number
    pageSize: number
}

export interface PaginationResults extends PaginationOptions {
    totalCount: number
    totalPages: number
}
