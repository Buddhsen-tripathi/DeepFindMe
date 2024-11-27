import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsernameSearchModule } from './module/username-search.module';
import { MetadataModule } from './module/metadata-extractor.module';

@Module({
  imports: [UsernameSearchModule, MetadataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
