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
    async signInWithOAuth(provider: 'google' | 'github', redirectTo: string) {
        const { data, error } = await this.client.auth.signInWithOAuth({
            provider,
            options: { redirectTo },
        });
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
        return data;
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
            .insert([{
                user_id: user.id,
                username,         // Ensure username is defined
                email: email      // Include email in the same object
            }]);

        if (profileError) {
            throw new Error(`Failed to create user profile: ${profileError.message}`);
        }

        return user;  // Return the user object
    }

    async getProfileByUserId(userId: string) {
        const { data, error } = await this.client
            .from('profiles')
            .select('username, created_at,email')
            .eq('user_id', userId)
            .single();  // Return single row matching user_id

        if (error) {
            throw new Error(`Failed to fetch profile: ${error.message}`);
        }

        return data;
    }

    // Method to change the user's password
    async changePassword(newPassword: string, currentPassword: string) {
        const { data, error } = await this.client.auth.updateUser({ password: newPassword });

        if (error) {
            throw new Error(`Failed to update password: ${error.message}`);
        }

        // If required, validate the current password (this is typically done by re-authenticating)
        // This approach assumes the user is already authenticated in the session

        return data.user;  // Return updated user data
    }

}