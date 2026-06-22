import { ServiceCategory, EventStatus } from '../enums';

/** Full Event entity */
export interface IEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  coverImage: string | null;
  category: ServiceCategory;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  tags: string[];
  status: EventStatus;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

/** Lightweight event for list views */
export interface EventListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  category: ServiceCategory;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  status: EventStatus;
  createdAt: string;
}
