import { Controller, Post, Body } from '@nestjs/common';
import { DnsLookupService } from '../service/dns-lookup.service';

@Controller('dns-lookup')
export class DnsLookupController {
  constructor(private readonly dnsLookupService: DnsLookupService) {}

  @Post()
  async lookup(@Body() body: { domain: string }) {
    const { domain } = body;
    if (!domain) {
      throw new Error('Domain is required.');
    }
    return {
      records: await this.dnsLookupService.lookup(domain),
    };
  }
}
