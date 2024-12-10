import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { WhoisService } from '../service/whois.service';

@Controller('whois')
export class WhoisController {
  constructor(private readonly whoisService: WhoisService) {}

  @Post()
  async lookup(@Body('domain') domain: string) {
    if (!domain || domain.trim() === '') {
      throw new HttpException('Domain name is required.', HttpStatus.BAD_REQUEST);
    }

    try {
      const whoisData = await this.whoisService.lookup(domain);
      return { domain, whois_data: whoisData };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve WHOIS information.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
