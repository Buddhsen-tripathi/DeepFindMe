import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { SignInDto } from '../dto/sign-in.dto';  // For email/password sign-in validation
import { CreateUserDto } from '../dto/create-user.dto';

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

    // Method to sign in with OAuth (Google/GitHub)
    async signInWithOAuth(provider: 'google' | 'github') {
        const { data, error } = await this.client.auth.signInWithOAuth({ provider });

        if (error) {
            throw new Error(`Failed to sign in with ${provider}: ${error.message}`);
        }

        return data; // Contains user information and session details
    }

    // Method to sign in with email and password
    async signInWithEmailPassword(signInDto: SignInDto) {
        const { email, password } = signInDto;
        const { data, error } = await this.client.auth.signInWithPassword({ email, password });

        if (error) {
            if (error.message.includes('invalid')) {
                throw new Error('Invalid email or password.');
            } else {
                throw new Error(`Sign-in failed: ${error.message}`);
            }
        }

        return data.user;
    }


    // Method to create a user with email and password
    async createUser(createUserDto: CreateUserDto) {
        const { email, password, username } = createUserDto;

        // Step 1: Sign up the user with email and password
        const { data, error } = await this.client.auth.signUp({ email, password });

        if (error) {
            throw new Error(`Failed to sign up: ${error.message}`);
        }

        // Step 2: Create a profile for the user with the username
        const { user } = data;
        const { error: profileError } = await this.client
            .from('profiles')
            .insert([{ user_id: user.id, username }]);  // Insert username into profiles table

        if (profileError) {
            throw new Error(`Failed to create user profile: ${profileError.message}`);
        }

        return user;  // Return the user object
    }
}