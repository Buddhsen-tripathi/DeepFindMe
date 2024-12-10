import { Module } from '@nestjs/common';
import { WhoisService } from '../service/whois.service';
import { WhoisController } from '../controller/whois.controller';

@Module({
  controllers: [WhoisController],
  providers: [WhoisService],
})
export class WhoisModule {}