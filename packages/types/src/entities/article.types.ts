import { ArticleStatus, ServiceCategory } from '../enums';

/** Full article entity shape */
export interface IArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  category: ServiceCategory;
  tags: string[];
  status: ArticleStatus;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

/** Article list item — lighter payload for listing pages */
export type ArticleListItem = Pick<
  IArticle,
  'id' | 'title' | 'slug' | 'excerpt' | 'coverImage' | 'category' | 'tags' | 'status' | 'createdAt'
>;
