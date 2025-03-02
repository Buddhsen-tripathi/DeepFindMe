import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class FileEncryptorService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = crypto.randomBytes(32); // Change this for a fixed key
  private readonly iv = crypto.randomBytes(16);

  encrypt(fileBuffer: Buffer): Buffer {
    console.log('Starting encryption process');

    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);

    console.log('Encryption process completed');
    return Buffer.concat([this.iv, encryptedBuffer]); // Prepend IV for decryption
  }

  decrypt(fileBuffer: Buffer): Buffer {
    console.log('Starting decryption process');

    const iv = fileBuffer.slice(0, 16); // Extract IV
    const encryptedData = fileBuffer.slice(16);
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    console.log('Decryption process completed');
    return decryptedBuffer;
  }
}