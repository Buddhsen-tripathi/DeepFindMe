import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PortScannerService } from '../service/port-scanner.service';

@Controller('port-scan')
export class PortScannerController {
    constructor(private readonly portScannerService: PortScannerService) { }

    @Post()
    async scan(@Body() body: { ipOrDomain: string; portRange: string }) {
        const { ipOrDomain, portRange } = body;
        if (!ipOrDomain || !portRange) {
            throw new Error('IP/Domain and Port Range are required.');
        }
        
        try {
            return {
                results: await this.portScannerService.scanPorts(ipOrDomain, portRange),
            };
        } catch (error) {
            throw new HttpException(
                error.message || 'Port scanning failed',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}