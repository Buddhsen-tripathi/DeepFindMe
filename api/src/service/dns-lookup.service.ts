import { Injectable } from '@nestjs/common';
import * as dns from 'dns/promises';

@Injectable()
export class DnsLookupService {
  async lookup(domain: string): Promise<{ recordType: string; value: string }[]> {
    const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA'];
    const results: { recordType: string; value: string }[] = [];

    for (const type of recordTypes) {
      try {
        const records = await dns.resolve(domain, type);
        if (Array.isArray(records)) {
          results.push(
            ...records.map((record) => ({
              recordType: type,
              value: typeof record === 'object' ? JSON.stringify(record) : record,
            })),
          );
        } else {
          results.push({
            recordType: type,
            value: JSON.stringify(records),
          });
        }
      } catch (error) {
        if (error.code === 'ENODATA') {
          console.warn(`No data found for DNS query of type ${type} on domain ${domain}.`);
        } else {
          console.error(`DNS query failed for type ${type} on domain ${domain}: ${error.message}`);
        }
      }
    }

    // Filter out empty array-like values and ensure uniqueness based on recordType and value
    const response = [
      ...new Map(results.filter(({ value }) => value !== '[]').map(item => [`${item.recordType}-${item.value}`, item])).values(),
    ];

    return response;
  }
}
