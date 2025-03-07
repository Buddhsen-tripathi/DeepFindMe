import { Injectable } from '@nestjs/common';
import * as dns from 'dns/promises';

@Injectable()
export class DnsLookupService {
  async lookup(domain: string): Promise<{ recordType: string; value: string }[]> {
    console.log(`DNS lookup service triggered for domain: ${domain}`);
    
    const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA'];
    const results: { recordType: string; value: string }[] = [];

    for (const type of recordTypes) {
      console.log(`Querying DNS records of type: ${type} for domain: ${domain}`);
      try {
        const records = await dns.resolve(domain, type);
        if (Array.isArray(records)) {
          results.push(
            ...records.map((record) => ({
              recordType: type,
              value: typeof record === 'object' ? JSON.stringify(record) : record,
            })),
          );
          console.log(`Found ${records.length} records of type ${type} for domain ${domain}`);
        } else {
          results.push({
            recordType: type,
            value: JSON.stringify(records),
          });
          console.log(`Found 1 record of type ${type} for domain ${domain}`);
        }
      } catch (error) {
        if (error.code === 'ENODATA') {
          console.warn(`No data found for DNS query of type ${type} on domain ${domain}.`);
        } else {
          console.error(`DNS query failed for type ${type} on domain ${domain}: ${error.message}`);
        }
      }
    }

    const response = [
      ...new Map(results.filter(({ value }) => value !== '[]').map(item => [`${item.recordType}-${item.value}`, item])).values(),
    ];

    console.log(`DNS lookup service completed for domain: ${domain}`);
    return response;
  }
}