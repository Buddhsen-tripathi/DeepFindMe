import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsernameSearchModule } from './module/username-search.module';
import { MetadataModule } from './module/metadata-extractor.module';
import { NotifyModule } from './module/notify.module';
import { SharedModule } from './module/shared.module'; 
import { WhoisModule } from './module/whois.module';
import { IpGeolocationModule } from './module/ip-geolocation.module';

@Module({
  imports: [UsernameSearchModule, MetadataModule, NotifyModule, SharedModule,WhoisModule,IpGeolocationModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
