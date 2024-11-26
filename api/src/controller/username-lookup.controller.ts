import { Controller, Post, Body } from '@nestjs/common';
import { UsernameLookupService } from 'src/service/username-lookup.service';

@Controller('username-lookup')
export class UsernameLookupController {
  constructor(private readonly lookupService: UsernameLookupService) {}

  @Post()
  async lookup(@Body('username') username: string) {
    return this.lookupService.lookupUsername(username);
  }
}
