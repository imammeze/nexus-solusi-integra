import api from './api';

/** Fetch published case studies (public) */
export async function getCaseStudies(page = 1, limit = 10, category?: string) {
  const params: Record<string, any> = { page, limit };
  if (category) params.category = category;

  const { data } = await api.get('/case-studies', { params });
  return data;
}

/** Fetch a single case study by slug (public) */
export async function getCaseStudyBySlug(slug: string) {
  const { data } = await api.get(`/case-studies/slug/${slug}`);
  return data;
}
