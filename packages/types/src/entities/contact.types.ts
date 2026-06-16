import { ContactMessageStatus, ServiceCategory } from '../enums';

/** Contact form submission / lead entity */
export interface IContactMessage {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  service: ServiceCategory;
  description: string;
  status: ContactMessageStatus;
  createdAt: string;
  updatedAt: string;
}

/** Contact message list item for admin inbox */
export type ContactMessageListItem = Pick<
  IContactMessage,
  'id' | 'fullName' | 'companyName' | 'email' | 'service' | 'status' | 'createdAt'
>;
