export interface ManyResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
}
