import { Controller, Get, Query } from '@nestjs/common';
import { SubdomainFinderService } from '../service/subdomain-finder.service';

@Controller('subdomains')
export class SubdomainFinderController {
    constructor(private readonly subdomainFinderService: SubdomainFinderService) {}

    @Get()
    async getSubdomains(
        @Query('domain') domain: string,
        @Query('mode') mode: 'top200' | 'full' = 'top200',
    ) {
        if (!domain) {
            return { error: 'Domain query parameter is required' };
        }

        const subdomains = await this.subdomainFinderService.findSubdomains(domain, mode);
        return { domain, subdomains, mode };
    }
}