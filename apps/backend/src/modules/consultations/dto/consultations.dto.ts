import { IsNotEmpty, IsString, IsEnum, IsDateString, Matches, IsOptional } from 'class-validator';

enum ServiceCategory {
  FINANCE = 'FINANCE',
  MANAGEMENT = 'MANAGEMENT',
  IT = 'IT',
}

enum ConsultationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateConsultationDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsString()
  whatsapp!: string;

  @IsNotEmpty()
  @IsEnum(ServiceCategory)
  service!: ServiceCategory;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsDateString()
  consultDate!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be in HH:mm format' })
  startTime!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime must be in HH:mm format' })
  endTime!: string;
}

export class UpdateConsultationStatusDto {
  @IsNotEmpty()
  @IsEnum(ConsultationStatus)
  status!: ConsultationStatus;

  @IsOptional()
  @IsString()
  adminNotes?: string;
}
