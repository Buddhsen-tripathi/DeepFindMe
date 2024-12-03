import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsernameSearchModule } from './module/username-search.module';
import { MetadataModule } from './module/metadata-extractor.module';
import { NotifyModule } from './module/notify.module';
import { SharedModule } from './module/shared.module'; 

@Module({
  imports: [UsernameSearchModule, MetadataModule, NotifyModule, SharedModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
