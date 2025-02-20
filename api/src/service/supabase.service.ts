import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SupabaseService {
    private readonly client: SupabaseClient;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('Supabase configuration is missing.');
            throw new Error('Supabase URL or Key is not defined in environment variables.');
        }

        this.client = createClient(supabaseUrl, supabaseKey);
    }

    getClient(): SupabaseClient {
        return this.client;
    }
}