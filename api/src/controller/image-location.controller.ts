import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../service/image-location.service';

@Controller('image-location')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
        if (!file) {
            throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.imageService.handleImage(file);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
