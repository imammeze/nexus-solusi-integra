import { ContactMessageStatus, ServiceCategory } from '../enums';

/** Submit contact/consultation form (public) */
export interface CreateContactMessageDto {
  fullName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  service: ServiceCategory;
  description: string;
}

/** Update contact message status (admin only) */
export interface UpdateContactStatusDto {
  status: ContactMessageStatus;
}
