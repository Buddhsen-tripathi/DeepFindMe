import { Injectable } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class PortScannerService {
  async scanPorts(ipOrDomain: string, portRange: string): Promise<{ port: number; status: string }[]> {
    const [startPort, endPort] = portRange.split('-').map(Number);

    if (!startPort || !endPort || startPort > endPort) {
      throw new Error('Invalid port range.');
    }
    
    const scanPort = async (port: number): Promise<{ port: number; status: string }> => {
      return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(1000);
        socket.on('connect', () => {
          socket.destroy();
          resolve({ port, status: 'open' });
        });
        socket.on('timeout', () => {
          socket.destroy();
          resolve({ port, status: 'closed' });
        });
        socket.on('error', () => resolve({ port, status: 'closed' }));
        socket.connect(port, ipOrDomain);
      });
    };
    
    const results = await Promise.all(
      Array.from({ length: endPort - startPort + 1 }, (_, i) => startPort + i)
        .map(scanPort)
    );

    const reponse = results.filter(({ status }) => status === 'open');
    return reponse;
  }
}
