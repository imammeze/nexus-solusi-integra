import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  MaxLength,
  IsArray,
  Matches,
} from 'class-validator';
import { EventStatus, ServiceCategory } from '@repo/types';

/** Validated create event body */
export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  excerpt!: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsEnum(ServiceCategory)
  category!: ServiceCategory;

  @IsNotEmpty()
  @IsDateString()
  eventDate!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be in HH:mm format' })
  startTime!: string;

  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime must be in HH:mm format' })
  endTime!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;
}

/** Validated update event body — all fields optional */
export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  excerpt?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsEnum(ServiceCategory)
  @IsOptional()
  category?: ServiceCategory;

  @IsDateString()
  @IsOptional()
  eventDate?: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be in HH:mm format' })
  @IsOptional()
  startTime?: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime must be in HH:mm format' })
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;
}
