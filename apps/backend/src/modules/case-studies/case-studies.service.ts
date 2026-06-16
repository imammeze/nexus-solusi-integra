import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../database/prisma.service';
import { CreateCaseStudyDto, UpdateCaseStudyDto } from './dto/case-studies.dto';

@Injectable()
export class CaseStudiesService {
  private readonly logger = new Logger(CaseStudiesService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Create a new case study with auto-generated slug */
  async create(dto: CreateCaseStudyDto) {
    const slug = await this.generateUniqueSlug(dto.title);

    const caseStudy = await this.prisma.caseStudy.create({
      data: { ...dto, slug },
    });

    this.logger.log(`Case study created: ${caseStudy.title} (${caseStudy.id})`);
    return caseStudy;
  }

  /** Get all published case studies (public) with pagination */
  async findAllPublished(page = 1, limit = 10, category?: string) {
    const where: any = { status: 'PUBLISHED' };
    if (category) where.category = category;

    const [data, total] = await Promise.all([
      this.prisma.caseStudy.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.caseStudy.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /** Get all case studies (admin) with pagination */
  async findAll(page = 1, limit = 10) {
    const [data, total] = await Promise.all([
      this.prisma.caseStudy.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.caseStudy.count(),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /** Get a single case study by slug (public) */
  async findBySlug(slug: string) {
    const caseStudy = await this.prisma.caseStudy.findUnique({
      where: { slug },
    });

    if (!caseStudy) {
      throw new NotFoundException(`Case study with slug "${slug}" not found`);
    }

    return caseStudy;
  }

  /** Get a single case study by ID (admin) */
  async findById(id: string) {
    const caseStudy = await this.prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy) {
      throw new NotFoundException(`Case study with ID "${id}" not found`);
    }

    return caseStudy;
  }

  /** Update a case study */
  async update(id: string, dto: UpdateCaseStudyDto) {
    await this.findById(id);

    const updateData: any = { ...dto };
    if (dto.title) {
      updateData.slug = await this.generateUniqueSlug(dto.title, id);
    }

    return this.prisma.caseStudy.update({
      where: { id },
      data: updateData,
    });
  }

  /** Delete a case study */
  async remove(id: string) {
    await this.findById(id);

    await this.prisma.caseStudy.delete({ where: { id } });
    this.logger.log(`Case study deleted: ${id}`);
    return { deleted: true };
  }

  /** Generate a unique slug from title */
  private async generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    let slug = slugify(title, { lower: true, strict: true });
    let counter = 0;

    while (true) {
      const candidate = counter === 0 ? slug : `${slug}-${counter}`;
      const existing = await this.prisma.caseStudy.findUnique({
        where: { slug: candidate },
      });

      if (!existing || existing.id === excludeId) {
        return candidate;
      }
      counter++;
    }
  }
}
