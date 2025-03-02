import { Module } from '@nestjs/common';
import { FileProtectionController } from '../controller/file-encryptor.controller';
import { FileEncryptorService } from '../service/file-encryptor.service';

@Module({
  controllers: [FileProtectionController],
  providers: [FileEncryptorService],
})
export class FileProtectionModule {}
