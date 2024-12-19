import { Module } from '@nestjs/common';
import { PortScannerController } from '../controller/port-scanner.controller';
import { PortScannerService } from '../service/port-scanner.service';

@Module({
  controllers: [PortScannerController],
  providers: [PortScannerService],
})
export class PortScannerModule {}