import {
    Controller,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileEncryptorService } from '../service/file-encryptor.service';

@Controller('file-protection')
export class FileProtectionController {
    constructor(private readonly fileService: FileEncryptorService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async processFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('operation') operation: 'encrypt' | 'decrypt',
        @Res() res: Response,
    ) {
        if (!file) throw new BadRequestException('File is required');
        if (!operation) throw new BadRequestException('Operation (encrypt/decrypt) is required');

        let processedFile: Buffer;

        if (operation === 'encrypt') {
            processedFile = await this.fileService.encrypt(file.buffer);
        } else if (operation === 'decrypt') {
            processedFile = await this.fileService.decrypt(file.buffer);
        } else {
            throw new BadRequestException('Invalid operation');
        }

        res.set({
            'Content-Disposition': `attachment; filename="${operation}-${file.originalname}"`,
            'Content-Type': file.mimetype,
        });

        return res.send(processedFile);
    }
}
