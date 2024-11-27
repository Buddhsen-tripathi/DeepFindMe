import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MetadataService } from '../service/metadata-extractor.service';
import { diskStorage } from 'multer';

@Controller('metadata-extractor')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max size
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/image|video|audio|application/)) {
          return callback(
            new BadRequestException('Unsupported file type.'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async extractMetadata(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    return this.metadataService.extractMetadata(file.path);
  }
}
