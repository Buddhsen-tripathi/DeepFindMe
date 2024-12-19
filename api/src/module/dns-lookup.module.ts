import { Module } from '@nestjs/common';
import { DnsLookupController } from '../controller/dns-lookup.controller';
import { DnsLookupService } from '../service/dns-lookup.service';

@Module({
  controllers: [DnsLookupController],
  providers: [DnsLookupService],
})
export class DnsLookupModule {}