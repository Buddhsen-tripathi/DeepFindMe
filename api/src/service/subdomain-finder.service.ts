import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import { promises as dnsPromises } from 'dns';
import { join } from 'path';

@Injectable()
export class SubdomainFinderService {
    private readonly logger = new Logger(SubdomainFinderService.name);
    private readonly resolver = new dnsPromises.Resolver();

    constructor() {
        this.resolver.setServers(['1.1.1.1', '8.8.8.8']);
    }

    async findSubdomains(domain: string, mode: 'top200' | 'full' = 'top200'): Promise<string[]> {
        const subdomains = new Set<string>();
        await this.bruteForceSubdomains(domain, subdomains, mode);
        return Array.from(subdomains);
    }

    private async bruteForceSubdomains(domain: string, subdomains: Set<string>, mode: 'top200' | 'full') {
        try {
            const filePath = mode === 'top200'
                ? join(process.cwd(), 'src', 'resources', 'subdomains-200.txt')
                : join(process.cwd(), 'src', 'resources', 'subdomains.txt');
            this.logger.log(`Loading subdomain list from: ${filePath} (Mode: ${mode})`);
            const data = await fs.readFile(filePath, 'utf8');
            const wordlist = data.split('\n').map((line) => line.trim()).filter(Boolean);

            this.logger.log(`Loaded ${wordlist.length} potential subdomains`);

            const concurrencyLimit = 50;
            for (let i = 0; i < wordlist.length; i += concurrencyLimit) {
                const batch = wordlist.slice(i, i + concurrencyLimit);
                const results = await Promise.allSettled(
                    batch.map((sub) => this.checkSubdomain(`${sub}.${domain}`)),
                );

                results.forEach((result, idx) => {
                    if (result.status === 'fulfilled' && result.value) {
                        const subdomain = `${batch[idx]}.${domain}`;
                        subdomains.add(subdomain);
                        this.logger.log(`Found subdomain: ${subdomain}`);
                    }
                });

                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        } catch (error) {
            this.logger.error(`Failed to load subdomain wordlist for mode ${mode}`, error);
            throw error;
        }
    }

    private async checkSubdomain(subdomain: string): Promise<boolean> {
        for (const recordType of ['A', 'CNAME'] as const) {
            try {
                await this.resolver.resolve(subdomain, recordType);
                return true;
            } catch (error) {
                if (error.code === 'ENOTFOUND') {
                    continue;
                }
                this.logger.debug(`Resolution failed for ${subdomain} (${recordType}): ${error.message}`);
            }
        }
        return false;
    }
}