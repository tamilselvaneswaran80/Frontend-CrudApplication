export interface PagedResult<T> {
  data: T[];
  total: number;
  totalPages: number;
}
