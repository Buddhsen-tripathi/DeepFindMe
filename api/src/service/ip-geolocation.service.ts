import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IpGeolocationService {
  private apiUrl = 'http://ip-api.com/json/'; // Using the ip-api.com free API

  constructor(private readonly httpService: HttpService) {}

  async getLocationByIp(ip: string) {
    console.log(`Fetching location for IP: ${ip}`);
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.apiUrl}${ip}`),
      );
      
      if (response.data.status === 'fail') {
        console.warn(`IP not found: ${ip}`);
        throw new HttpException('IP not found', HttpStatus.NOT_FOUND);
      }

      console.log(`Location data for IP ${ip}: ${JSON.stringify(response.data)}`);
      return response.data; 
    } catch (error) {
      console.error(`Error fetching location data for IP ${ip}: ${error.message}`);
      throw new HttpException(
        'Error fetching location data.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}