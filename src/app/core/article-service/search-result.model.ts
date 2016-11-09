export interface SearchResult<T> {
    pageSize: number;
    pageIndex: number;
    total: number;
    result: T[];
}
