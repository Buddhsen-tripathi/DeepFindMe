import { Module } from '@nestjs/common';
import { ImageController } from '../controller/image-location.controller';
import { ImageService } from '../service/image-location.service';

@Module({
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageLocationModule { }