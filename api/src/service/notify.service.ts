import { Injectable, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../service/supabase.service';

@Injectable()
export class NotifyService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async addEmail(email: string, tool: string): Promise<void> {
        const supabase = this.supabaseService.getClient();
    
        const { data, error } = await supabase
            .from('emails')
            .insert([{ email, tool: tool }]);
    
        console.log('Supabase Insert Response:', { data, error });
    
        if (error) {
            console.error('Supabase Insert Error:', error); 
            if (error.code === '23505') { 
                throw new ConflictException('Email for this tool already exists');
            }
            throw new Error(error.message);
        }
    }

    async getAllEmails(): Promise<{ email: string; tool: string }[]> {
        const supabase = this.supabaseService.getClient();

        const { data, error } = await supabase
            .from('emails')
            .select('email, tool');

        if (error) {
            throw new Error(error.message);
        }

        return data.map((row) => ({ email: row.email, tool: row.tool }));
    }
}
