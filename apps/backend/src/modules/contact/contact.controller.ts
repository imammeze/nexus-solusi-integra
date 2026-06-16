import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactMessageDto, UpdateContactStatusDto } from './dto/contact.dto';
import { Public } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // ============ PUBLIC ENDPOINT ============

  /** POST /api/contact — Submit contact form (public) */
  @Public()
  @Post()
  async create(@Body() dto: CreateContactMessageDto) {
    return this.contactService.create(dto);
  }

  // ============ ADMIN ENDPOINTS ============

  /** GET /api/contact/admin — All messages inbox (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.contactService.findAll(page, limit, status);
  }

  /** GET /api/contact/admin/:id — Single message detail (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  async findById(@Param('id') id: string) {
    return this.contactService.findById(id);
  }

  /** PATCH /api/contact/admin/:id/status — Update message status (admin) */
  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateContactStatusDto) {
    return this.contactService.updateStatus(id, dto);
  }

  /** DELETE /api/contact/admin/:id — Delete message (admin) */
  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  async remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
