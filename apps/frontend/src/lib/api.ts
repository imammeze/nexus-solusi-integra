const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// ── Helper: get token from localStorage ──
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

// ── Generic fetch wrapper ──
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets boundary automatically)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API Error: ${res.status}`);
  }

  return res.json();
}

// ═══════════════════════════════════════
// AUTH
// ═══════════════════════════════════════

export async function apiLogin(email: string, password: string) {
  return apiFetch<{
    accessToken: string;
    user: { id: string; email: string; name: string; role: string };
  }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function apiGetProfile() {
  return apiFetch<{ id: string; email: string; name: string; role: string }>(
    '/auth/profile',
  );
}

// ═══════════════════════════════════════
// ARTICLES
// ═══════════════════════════════════════

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  status: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: { id: string; name: string };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export async function fetchArticles(page = 1, limit = 10) {
  return apiFetch<PaginatedResponse<Article>>(
    `/articles/admin?page=${page}&limit=${limit}`,
  );
}

export async function fetchArticleById(id: string) {
  return apiFetch<Article>(`/articles/admin/${id}`);
}

export async function createArticle(data: {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string[];
  status?: string;
  coverImage?: string;
}) {
  return apiFetch<Article>('/articles', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateArticle(
  id: string,
  data: Partial<{
    title: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    status: string;
    coverImage: string;
  }>,
) {
  return apiFetch<Article>(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteArticle(id: string) {
  return apiFetch<{ deleted: boolean }>(`/articles/${id}`, {
    method: 'DELETE',
  });
}

// ═══════════════════════════════════════
// CASE STUDIES
// ═══════════════════════════════════════

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  coverImage: string | null;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchCaseStudies(page = 1, limit = 10) {
  return apiFetch<PaginatedResponse<CaseStudy>>(
    `/case-studies/admin?page=${page}&limit=${limit}`,
  );
}

export async function fetchCaseStudyById(id: string) {
  return apiFetch<CaseStudy>(`/case-studies/admin/${id}`);
}

export async function createCaseStudy(data: {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  impact: string;
  category: string;
  status?: string;
  coverImage?: string;
}) {
  return apiFetch<CaseStudy>('/case-studies', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCaseStudy(
  id: string,
  data: Partial<{
    title: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    impact: string;
    category: string;
    status: string;
    coverImage: string;
  }>,
) {
  return apiFetch<CaseStudy>(`/case-studies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteCaseStudy(id: string) {
  return apiFetch<{ deleted: boolean }>(`/case-studies/${id}`, {
    method: 'DELETE',
  });
}

// ═══════════════════════════════════════
// CONTACT MESSAGES
// ═══════════════════════════════════════

export interface ContactMessage {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  service: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchMessages(page = 1, limit = 10, status?: string) {
  let url = `/contact/admin?page=${page}&limit=${limit}`;
  if (status) url += `&status=${status}`;
  return apiFetch<PaginatedResponse<ContactMessage>>(url);
}

export async function fetchMessageById(id: string) {
  return apiFetch<ContactMessage>(`/contact/admin/${id}`);
}

export async function updateMessageStatus(id: string, status: string) {
  return apiFetch<ContactMessage>(`/contact/admin/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function deleteMessage(id: string) {
  return apiFetch<{ deleted: boolean }>(`/contact/admin/${id}`, {
    method: 'DELETE',
  });
}

// ═══════════════════════════════════════
// FILE UPLOAD
// ═══════════════════════════════════════

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return apiFetch<{ url: string; originalName: string; size: number }>(
    '/upload',
    {
      method: 'POST',
      body: formData,
    },
  );
}

// ═══════════════════════════════════════
// CONSULTATIONS
// ═══════════════════════════════════════

export interface Consultation {
  id: string;
  fullName: string;
  whatsapp: string;
  service: string;
  description: string;
  consultDate: string;
  startTime: string;
  endTime: string;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Public — create a consultation booking (no auth needed) */
export async function createConsultation(data: {
  fullName: string;
  whatsapp: string;
  service: string;
  description: string;
  consultDate: string;
  startTime: string;
  endTime: string;
}) {
  // Public endpoint — don't send auth token
  const res = await fetch(`${API_BASE}/consultations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API Error: ${res.status}`);
  }
  return res.json();
}

/** Public — get approved consultations for a specific date */
export async function fetchConsultationsByDate(date: string) {
  const res = await fetch(`${API_BASE}/consultations/date/${date}`);
  if (!res.ok) return [];
  return res.json();
}

/** Admin — get all consultations (paginated) */
export async function fetchConsultationsAdmin(page = 1, limit = 10, status?: string) {
  let url = `/consultations/admin?page=${page}&limit=${limit}`;
  if (status) url += `&status=${status}`;
  return apiFetch<PaginatedResponse<Consultation>>(url);
}

/** Admin — update consultation status */
export async function updateConsultationStatus(id: string, status: string, adminNotes?: string) {
  return apiFetch<Consultation>(`/consultations/admin/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, adminNotes }),
  });
}

/** Admin — delete consultation */
export async function deleteConsultation(id: string) {
  return apiFetch<{ deleted: boolean }>(`/consultations/admin/${id}`, {
    method: 'DELETE',
  });
}

// ═══════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  tags: string[];
  status: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: { id: string; name: string };
}

/** Admin — get all events (paginated) */
export async function fetchEvents(page = 1, limit = 10) {
  return apiFetch<PaginatedResponse<Event>>(
    `/events/admin?page=${page}&limit=${limit}`,
  );
}

/** Admin — get single event by ID */
export async function fetchEventById(id: string) {
  return apiFetch<Event>(`/events/admin/${id}`);
}

/** Admin — create event */
export async function createEvent(data: {
  title: string;
  description: string;
  excerpt: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  tags?: string[];
  status?: string;
  coverImage?: string;
}) {
  return apiFetch<Event>('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** Admin — update event */
export async function updateEvent(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    excerpt: string;
    category: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    location: string;
    tags: string[];
    status: string;
    coverImage: string;
  }>,
) {
  return apiFetch<Event>(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/** Admin — delete event */
export async function deleteEvent(id: string) {
  return apiFetch<{ deleted: boolean }>(`/events/${id}`, {
    method: 'DELETE',
  });
}
