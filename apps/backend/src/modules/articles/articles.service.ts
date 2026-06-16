import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../database/prisma.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/articles.dto';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Create a new article with auto-generated slug */
  async create(dto: CreateArticleDto, authorId: string) {
    const slug = await this.generateUniqueSlug(dto.title);

    const article = await this.prisma.article.create({
      data: {
        ...dto,
        slug,
        tags: dto.tags ?? [],
        authorId,
      },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    this.logger.log(`Article created: ${article.title} (${article.id})`);
    return article;
  }

  /** Get all published articles (public) with pagination */
  async findAllPublished(page = 1, limit = 10, category?: string) {
    const where: any = { status: 'PUBLISHED' };
    if (category) where.category = category;

    const [data, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { author: { select: { id: true, name: true } } },
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /** Get all articles (admin) with pagination */
  async findAll(page = 1, limit = 10) {
    const [data, total] = await Promise.all([
      this.prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { author: { select: { id: true, name: true } } },
      }),
      this.prisma.article.count(),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /** Get a single article by slug (public) */
  async findBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true } } },
    });

    if (!article) {
      throw new NotFoundException(`Article with slug "${slug}" not found`);
    }

    return article;
  }

  /** Get a single article by ID (admin) */
  async findById(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true } } },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }

    return article;
  }

  /** Update an article */
  async update(id: string, dto: UpdateArticleDto) {
    await this.findById(id); // ensure exists

    const updateData: any = { ...dto };

    // Regenerate slug if title changed
    if (dto.title) {
      updateData.slug = await this.generateUniqueSlug(dto.title, id);
    }

    return this.prisma.article.update({
      where: { id },
      data: updateData,
      include: { author: { select: { id: true, name: true } } },
    });
  }

  /** Delete an article */
  async remove(id: string) {
    await this.findById(id); // ensure exists

    await this.prisma.article.delete({ where: { id } });
    this.logger.log(`Article deleted: ${id}`);
    return { deleted: true };
  }

  /** Generate a unique slug from title */
  private async generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    let slug = slugify(title, { lower: true, strict: true });
    let counter = 0;

    while (true) {
      const candidate = counter === 0 ? slug : `${slug}-${counter}`;
      const existing = await this.prisma.article.findUnique({
        where: { slug: candidate },
      });

      if (!existing || existing.id === excludeId) {
        return candidate;
      }
      counter++;
    }
  }
}
