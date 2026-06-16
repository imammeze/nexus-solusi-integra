import api from './api';
import { CreateContactMessageDto } from '@repo/types';

/** Submit contact/consultation form (public) */
export async function submitContactForm(data: CreateContactMessageDto) {
  const response = await api.post('/contact', data);
  return response.data;
}
