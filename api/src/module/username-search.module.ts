import { Module } from '@nestjs/common';
import { UsernameSearchService } from 'src/service/username-search.service';
import { UsernameSearchController } from 'src/controller/username-search.controller';

@Module({
  controllers: [UsernameSearchController],
  providers: [UsernameSearchService],
})
export class UsernameSearchModule {}