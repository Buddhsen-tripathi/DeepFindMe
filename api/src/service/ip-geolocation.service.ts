// src/ip-geolocation/ip-geolocation.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IpGeolocationService {
  private apiUrl = 'http://ip-api.com/json/'; // Using the ip-api.com free API

  constructor(private readonly httpService: HttpService) {}

  async getLocationByIp(ip: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}${ip}`),
      );
      
      if (response.data.status === 'fail') {
        throw new HttpException('IP not found', HttpStatus.NOT_FOUND);
      }

      return response.data; 
    } catch (error) {
      throw new HttpException(
        'Error fetching location data.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
