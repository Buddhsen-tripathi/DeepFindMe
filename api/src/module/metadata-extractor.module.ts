import { Module } from '@nestjs/common';
import { MetadataController } from '../controller/metadata-extractor.controller';
import { MetadataService } from '../service/metadata-extractor.service';

@Module({
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
