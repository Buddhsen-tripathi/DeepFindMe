import { Module } from '@nestjs/common';
import { FileProtectionController } from '../controller/file-protection.controller';
import { FileProtectionService } from '../service/file-protection.service';

@Module({
  controllers: [FileProtectionController],
  providers: [FileProtectionService],
})
export class FileProtectionModule {}
