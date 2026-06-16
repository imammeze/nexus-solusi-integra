import { ArticleStatus, ServiceCategory } from '../enums';

/** Create a new article */
export interface CreateArticleDto {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: ServiceCategory;
  tags?: string[];
  status?: ArticleStatus;
}

/** Update an existing article (all fields optional) */
export interface UpdateArticleDto extends Partial<CreateArticleDto> {}
