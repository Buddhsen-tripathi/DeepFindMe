import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsernameLookupModule } from './module/username-lookup.module';

@Module({
  imports: [UsernameLookupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
