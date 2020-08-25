export type Paginated<T> = {
  items: T[];
} & PaginationData;

export type PaginationData = {
  itemsCount: number;
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}
