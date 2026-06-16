/** Standard paginated API response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/** Standard single-item API response wrapper */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/** Standard error response */
export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}
