// src/ip-geolocation/ip-geolocation.module.ts

import { Module } from '@nestjs/common';
import { IpGeolocationService } from '../service/ip-geolocation.service';
import { IpGeolocationController } from '../controller/ip-geolocation.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [IpGeolocationService],
  controllers: [IpGeolocationController],
})
export class IpGeolocationModule {}
