import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateContactMessageDto, UpdateContactStatusDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Submit a contact form (public) */
  async create(dto: CreateContactMessageDto) {
    const message = await this.prisma.contactMessage.create({
      data: dto,
    });

    this.logger.log(`New contact message from: ${message.fullName} (${message.email})`);
    return message;
  }

  /** Get all contact messages (admin) with pagination and optional status filter */
  async findAll(page = 1, limit = 10, status?: string) {
    const where: any = {};
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.contactMessage.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  /** Get a single contact message by ID (admin) */
  async findById(id: string) {
    const message = await this.prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Contact message with ID "${id}" not found`);
    }

    return message;
  }

  /** Update contact message status (admin) */
  async updateStatus(id: string, dto: UpdateContactStatusDto) {
    await this.findById(id);

    const updated = await this.prisma.contactMessage.update({
      where: { id },
      data: { status: dto.status },
    });

    this.logger.log(`Contact message ${id} status changed to: ${dto.status}`);
    return updated;
  }

  /** Delete a contact message (admin) */
  async remove(id: string) {
    await this.findById(id);

    await this.prisma.contactMessage.delete({ where: { id } });
    this.logger.log(`Contact message deleted: ${id}`);
    return { deleted: true };
  }
}
