import { CaseStudyStatus, ServiceCategory } from '../enums';

/** Full case study entity shape */
export interface ICaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  coverImage: string | null;
  category: ServiceCategory;
  status: CaseStudyStatus;
  createdAt: string;
  updatedAt: string;
}

/** Case study list item for card-based listings */
export type CaseStudyListItem = Pick<
  ICaseStudy,
  'id' | 'title' | 'slug' | 'client' | 'industry' | 'coverImage' | 'category' | 'status' | 'createdAt'
>;
