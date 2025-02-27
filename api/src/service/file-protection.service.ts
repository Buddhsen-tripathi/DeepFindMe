import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class FileProtectionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = crypto.randomBytes(32); // Change this for a fixed key
  private readonly iv = crypto.randomBytes(16);

  encrypt(fileBuffer: Buffer): Buffer {
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
    return Buffer.concat([this.iv, encryptedBuffer]); // Prepend IV for decryption
  }

  decrypt(fileBuffer: Buffer): Buffer {
    const iv = fileBuffer.slice(0, 16); // Extract IV
    const encryptedData = fileBuffer.slice(16);
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
    return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  }
}
