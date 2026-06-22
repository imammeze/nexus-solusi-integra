import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../../database/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  /** Create a new event with auto-generated slug */
  async create(dto: CreateEventDto, authorId: string) {
    const slug = await this.generateUniqueSlug(dto.title);

    const event = await this.prisma.event.create({
      data: {
        ...dto,
        eventDate: new Date(dto.eventDate),
        slug,
        tags: dto.tags ?? [],
        authorId,
      },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    this.logger.log(`Event created: ${event.title} (${event.id})`);
    return event;
  }

  /** Get all published events (public) with pagination — upcoming first */
  async findAllPublished(page = 1, limit = 10, category?: string) {
    const where: any = { status: 'PUBLISHED' };
    if (category) where.category = category;

    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy: { eventDate: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { author: { select: { id: true, name: true } } },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /** Get upcoming published events (public) — for home page */
  async findUpcoming(limit = 3) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.event.findMany({
      where: {
        status: 'PUBLISHED',
        eventDate: { gte: today },
      },
      orderBy: { eventDate: 'asc' },
      take: limit,
      include: { author: { select: { id: true, name: true } } },
    });
  }

  /** Get all events (admin) with pagination */
  async findAll(page = 1, limit = 10) {
    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        orderBy: { eventDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { author: { select: { id: true, name: true } } },
      }),
      this.prisma.event.count(),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /** Get a single event by slug (public) */
  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true } } },
    });

    if (!event) {
      throw new NotFoundException(`Event with slug "${slug}" not found`);
    }

    return event;
  }

  /** Get a single event by ID (admin) */
  async findById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true } } },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    return event;
  }

  /** Update an event */
  async update(id: string, dto: UpdateEventDto) {
    const oldEvent = await this.findById(id); // ensure exists

    const updateData: any = { ...dto };

    if (dto.eventDate) {
      updateData.eventDate = new Date(dto.eventDate);
    }

    // Regenerate slug if title changed
    if (dto.title) {
      updateData.slug = await this.generateUniqueSlug(dto.title, id);
    }

    const updated = await this.prisma.event.update({
      where: { id },
      data: updateData,
      include: { author: { select: { id: true, name: true } } },
    });

    if (dto.coverImage && oldEvent.coverImage && dto.coverImage !== oldEvent.coverImage) {
      await this.uploadService.deleteImageIfOrphaned(oldEvent.coverImage);
    }

    return updated;
  }

  /** Delete an event */
  async remove(id: string) {
    const event = await this.findById(id); // ensure exists

    await this.prisma.event.delete({ where: { id } });
    this.logger.log(`Event deleted: ${id}`);

    if (event.coverImage) {
      await this.uploadService.deleteImageIfOrphaned(event.coverImage);
    }

    return { deleted: true };
  }

  /** Generate a unique slug from title */
  private async generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    let slug = slugify(title, { lower: true, strict: true });
    let counter = 0;

    while (true) {
      const candidate = counter === 0 ? slug : `${slug}-${counter}`;
      const existing = await this.prisma.event.findUnique({
        where: { slug: candidate },
      });

      if (!existing || existing.id === excludeId) {
        return candidate;
      }
      counter++;
    }
  }
}
