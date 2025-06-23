export interface PaginationResponse<T> {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalElements: number;
  data: T[];
  last: boolean;
}

export interface ErrorRequest {
  code: number;
  message: string;
}

export type RoleType = "ADMIN";
