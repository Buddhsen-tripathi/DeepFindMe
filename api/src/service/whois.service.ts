import { Injectable } from '@nestjs/common';
import * as whois from 'whois-json';

@Injectable()
export class WhoisService {
  async lookup(domain: string): Promise<Record<string, any>> {
    if (!domain || domain.trim() === '') {
      throw new Error('Domain cannot be empty.');
    }

    try {
      const whoisData = await whois(domain, { follow: 3 }); // Follow up to 3 whois redirects
      return whoisData;
    } catch (error) {
      throw new Error('Failed to fetch WHOIS data: ' + error.message);
    }
  }
}
