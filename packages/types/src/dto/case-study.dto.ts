import { CaseStudyStatus, ServiceCategory } from '../enums';

/** Create a new case study */
export interface CreateCaseStudyDto {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  coverImage?: string;
  category: ServiceCategory;
  status?: CaseStudyStatus;
}

/** Update an existing case study (all fields optional) */
export interface UpdateCaseStudyDto extends Partial<CreateCaseStudyDto> {}
