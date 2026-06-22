// ============================================================
// @repo/types — Shared TypeScript Types & DTOs
// Single source of truth for all data shapes across the monorepo
// ============================================================

// Enums
export {
  ServiceCategory,
  ArticleStatus,
  CaseStudyStatus,
  ContactMessageStatus,
  UserRole,
  EventStatus,
} from './enums';

// Entity interfaces
export {
  type IUser,
  type UserResponse,
  type IArticle,
  type ArticleListItem,
  type ICaseStudy,
  type CaseStudyListItem,
  type IContactMessage,
  type ContactMessageListItem,
  type IEvent,
  type EventListItem,
} from './entities';

// DTOs
export {
  type LoginDto,
  type RegisterDto,
  type AuthTokenResponse,
  type CreateArticleDto,
  type UpdateArticleDto,
  type CreateCaseStudyDto,
  type UpdateCaseStudyDto,
  type CreateContactMessageDto,
  type UpdateContactStatusDto,
  type CreateEventDto,
  type UpdateEventDto,
} from './dto';

// API response wrappers
export {
  type PaginatedResponse,
  type ApiResponse,
  type ApiErrorResponse,
} from './api-response.types';
