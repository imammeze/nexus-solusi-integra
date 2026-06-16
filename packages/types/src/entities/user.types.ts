import { UserRole } from '../enums';

/** Base user entity shape */
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/** User without sensitive fields (password) — safe for API responses */
export type UserResponse = Omit<IUser, never>;
