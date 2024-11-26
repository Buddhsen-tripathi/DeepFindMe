import { Module } from '@nestjs/common';
import { UsernameLookupService } from 'src/service/username-lookup.service';
import { UsernameLookupController } from 'src/controller/username-lookup.controller';

@Module({
  controllers: [UsernameLookupController],
  providers: [UsernameLookupService],
})
export class UsernameLookupModule {}