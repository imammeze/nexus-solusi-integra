import api from './api';

/** Fetch published articles (public) */
export async function getArticles(page = 1, limit = 10, category?: string) {
  const params: Record<string, any> = { page, limit };
  if (category) params.category = category;

  const { data } = await api.get('/articles', { params });
  return data;
}

/** Fetch a single article by slug (public) */
export async function getArticleBySlug(slug: string) {
  const { data } = await api.get(`/articles/slug/${slug}`);
  return data;
}
