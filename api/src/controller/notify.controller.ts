import { Body, Controller, Get, Post, BadRequestException, ConflictException } from '@nestjs/common';
import { NotifyService } from '../service/notify.service';

@Controller('notify')
export class NotifyController {
    constructor(private readonly notifyService: NotifyService) {}

    @Post()
    async addEmail(@Body() body: { email: string; tool: string }): Promise<{ message: string }> {
        const { email, tool } = body;

        // Basic validation for the email and tool
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            throw new BadRequestException('Invalid email address');
        }
        if (!tool || typeof tool !== 'string' || tool.trim() === '') {
            throw new BadRequestException('Invalid tool name');
        }

        try {
            await this.notifyService.addEmail(email, tool);
            return { message: 'Email and tool name added successfully' };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new BadRequestException('Failed to add email and tool name');
        }
    }

    @Get()
    async getAllEmails(): Promise<{ email: string; tool: string }[]> {
        return await this.notifyService.getAllEmails();
    }
}
