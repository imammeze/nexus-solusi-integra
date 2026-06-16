/** Login request payload */
export interface LoginDto {
  email: string;
  password: string;
}

/** Register admin request payload */
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

/** JWT token response */
export interface AuthTokenResponse {
  accessToken: string;
  tokenType: string;
}
