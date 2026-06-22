import { ServiceCategory, EventStatus } from '../enums';

/** DTO for creating a new event */
export interface CreateEventDto {
  title: string;
  description: string;
  excerpt: string;
  coverImage?: string;
  category: ServiceCategory;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  tags?: string[];
  status?: EventStatus;
}

/** DTO for updating an existing event */
export interface UpdateEventDto {
  title?: string;
  description?: string;
  excerpt?: string;
  coverImage?: string;
  category?: ServiceCategory;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  tags?: string[];
  status?: EventStatus;
}
