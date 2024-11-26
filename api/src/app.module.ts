import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsernameSearchModule } from './module/username-search.module';

@Module({
  imports: [UsernameSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
