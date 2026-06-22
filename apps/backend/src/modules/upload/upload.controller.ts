import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname, join } from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { JwtAuthGuard } from '../../common/guards';

const UPLOAD_DIR = join(process.cwd(), 'uploads');

@Controller('upload')
export class UploadController {
  /** POST /api/upload — Upload a single image file with deduplication (admin) */
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // Keep in memory to calculate hash
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg)$/)) {
          cb(new BadRequestException('Only image files are allowed'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Ensure uploads directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Calculate SHA-256 hash of the file buffer
    const hashSum = crypto.createHash('sha256');
    hashSum.update(file.buffer);
    const fileHash = hashSum.digest('hex');

    // Determine file extension and final name
    const ext = extname(file.originalname);
    const fileName = `${fileHash}${ext}`;
    const filePath = join(UPLOAD_DIR, fileName);

    // If file doesn't exist, save it. Otherwise, reuse the existing one.
    if (!fs.existsSync(filePath)) {
      await fs.promises.writeFile(filePath, file.buffer);
    }

    return {
      url: `/uploads/${fileName}`,
      originalName: file.originalname,
      size: file.size,
      reused: fs.existsSync(filePath), // true if it was already there
    };
  }
}
