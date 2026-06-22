// ============================================================
// Shared Enums — used across frontend & backend
// ============================================================

/** Service categories offered by the company */
export enum ServiceCategory {
  FINANCE = 'FINANCE',
  MANAGEMENT = 'MANAGEMENT',
  IT = 'IT',
}

/** Article status in the CMS */
export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

/** Case study status in the CMS */
export enum CaseStudyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

/** Contact message lifecycle status */
export enum ContactMessageStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

/** User roles for RBAC */
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

/** Event status in the CMS */
export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
