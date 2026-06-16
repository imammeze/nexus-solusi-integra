import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CaseStudyStatus, ServiceCategory } from '@repo/types';

/** Validated create case study body */
export class CreateCaseStudyDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  client!: string;

  @IsString()
  @IsNotEmpty()
  industry!: string;

  @IsString()
  @IsNotEmpty()
  challenge!: string;

  @IsString()
  @IsNotEmpty()
  solution!: string;

  @IsString()
  @IsNotEmpty()
  impact!: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsEnum(ServiceCategory)
  category!: ServiceCategory;

  @IsEnum(CaseStudyStatus)
  @IsOptional()
  status?: CaseStudyStatus;
}

/** Validated update case study body — all fields optional */
export class UpdateCaseStudyDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  client?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  challenge?: string;

  @IsString()
  @IsOptional()
  solution?: string;

  @IsString()
  @IsOptional()
  impact?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsEnum(ServiceCategory)
  @IsOptional()
  category?: ServiceCategory;

  @IsEnum(CaseStudyStatus)
  @IsOptional()
  status?: CaseStudyStatus;
}
