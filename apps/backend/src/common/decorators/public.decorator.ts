import { SetMetadata } from '@nestjs/common';

/** Key used by JwtAuthGuard to identify public routes */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to mark a route as publicly accessible (no JWT required).
 * Usage: @Public() on a controller method
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
