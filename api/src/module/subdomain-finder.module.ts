import { Module } from '@nestjs/common';
import { SubdomainFinderService } from '../service/subdomain-finder.service';
import { SubdomainFinderController } from '../controller/subdomain-finder.controller';

@Module({
  controllers: [SubdomainFinderController],
  providers: [SubdomainFinderService],
})
export class SubdomainFinderModule {}