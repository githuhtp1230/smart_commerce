export interface PaginationResponse<T> {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalElements: number;
  data: T[];
  last: boolean;
}

export type RoleType = "ADMIN";
