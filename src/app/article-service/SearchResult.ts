export class SearchResult<T> {
    pageSize: number;
    pageIndex: number;
    total: number;
    result: T[];
}
