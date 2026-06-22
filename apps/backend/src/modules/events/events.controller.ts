import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/events.dto';
import { Public } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // ============ PUBLIC ENDPOINTS ============

  /** GET /api/events — Published events list (public) */
  @Public()
  @Get()
  async findAllPublished(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('category') category?: string,
  ) {
    return this.eventsService.findAllPublished(page, limit, category);
  }

  /** GET /api/events/upcoming — Upcoming events (public, for home page) */
  @Public()
  @Get('upcoming')
  async findUpcoming(@Query('limit') limit?: number) {
    return this.eventsService.findUpcoming(limit);
  }

  /** GET /api/events/slug/:slug — Single event by slug (public) */
  @Public()
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.eventsService.findBySlug(slug);
  }

  // ============ ADMIN ENDPOINTS ============

  /** GET /api/events/admin — All events (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.eventsService.findAll(page, limit);
  }

  /** GET /api/events/admin/:id — Single event by ID (admin) */
  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  async findById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  /** POST /api/events — Create event (admin) */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateEventDto, @Request() req: any) {
    return this.eventsService.create(dto, req.user.sub);
  }

  /** PUT /api/events/:id — Update event (admin) */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  /** DELETE /api/events/:id — Delete event (admin) */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
