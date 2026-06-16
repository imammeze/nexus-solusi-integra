import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ContactMessageStatus, ServiceCategory } from '@repo/types';

/** Validated contact form submission (public) */
export class CreateContactMessageDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  whatsapp!: string;

  @IsEnum(ServiceCategory)
  service!: ServiceCategory;

  @IsString()
  @IsNotEmpty()
  description!: string;
}

/** Validated contact message status update (admin) */
export class UpdateContactStatusDto {
  @IsEnum(ContactMessageStatus)
  status!: ContactMessageStatus;
}
