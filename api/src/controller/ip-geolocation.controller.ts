import { Controller, Get, Param } from '@nestjs/common';
import { IpGeolocationService } from '../service/ip-geolocation.service';

@Controller('geolocation')
export class IpGeolocationController {
  constructor(private readonly ipGeolocationService: IpGeolocationService) {}

  @Get(':ip')
  async getLocation(@Param('ip') ip: string) {
    return this.ipGeolocationService.getLocationByIp(ip);
  }
}
