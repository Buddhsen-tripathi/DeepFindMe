import { Controller, Post, Body } from '@nestjs/common';
import { UsernameSearchService } from 'src/service/username-search.service';

@Controller('username-search')
export class UsernameSearchController {
  constructor(private readonly searchService: UsernameSearchService) {}

  @Post()
  async search(@Body('username') username: string) {
    return this.searchService.searchUsername(username);
  }
}
