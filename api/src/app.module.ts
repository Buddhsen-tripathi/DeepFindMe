import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsernameSearchModule } from './module/username-search.module';
import { MetadataModule } from './module/metadata-extractor.module';
import { NotifyModule } from './module/notify.module';
import { SharedModule } from './module/shared.module';
import { WhoisModule } from './module/whois.module';
import { IpGeolocationModule } from './module/ip-geolocation.module';
import { PortScannerModule } from './module/port-scanner.module';
import { DnsLookupModule } from './module/dns-lookup.module';
import { ImageLocationModule } from './module/image-location.module';
import { SubdomainFinderModule } from './module/subdomain-finder.module';
import { FileProtectionModule } from './module/file-protection.module';

@Module({
  imports: [UsernameSearchModule, MetadataModule, NotifyModule, SharedModule, WhoisModule, IpGeolocationModule, PortScannerModule, DnsLookupModule, ImageLocationModule, SubdomainFinderModule, FileProtectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}