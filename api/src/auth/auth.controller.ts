import { Controller, Post, HttpStatus, HttpException, Body, Get, Param, Patch } from '@nestjs/common';
import { SupabaseService } from '../service/supabase.service';
import { CreateUserDto } from '../dto/create-user.dto';  // For sign-up
import { SignInDto } from '../dto/sign-in.dto';          // For sign-in validation

@Controller('auth')
export class AuthController {
    constructor(private readonly supabaseService: SupabaseService) {}

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.supabaseService.createUser(createUserDto);
            return { message: 'Sign up successful', user: { id: user.id, email: user.email } };
        } catch (error) {
            throw new HttpException(`Sign-up failed: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signin')
    async signIn(@Body() signInDto: SignInDto) {
        try {
            const { user, session } = await this.supabaseService.signInWithEmailPassword(signInDto);
            return { message: 'Sign-in successful', user, session };
        } catch (error) {
            throw new HttpException(`Sign-in failed: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signin-google')
    async signInWithGoogle() {
        try {
            const redirectTo = 'http://deepfind.me/oauth/callback';
            const session = await this.supabaseService.signInWithOAuth('google', redirectTo);
            return { message: 'Sign in with Google initiated', url: session.url };
        } catch (error) {
            throw new HttpException(`Sign-in with Google failed: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signin-github')
    async signInWithGithub() {
        try {
            const redirectTo = 'http://deepfind.me/oauth/callback';
            const session = await this.supabaseService.signInWithOAuth('github', redirectTo);
            return { message: 'Sign in with GitHub initiated', url: session.url };
        } catch (error) {
            throw new HttpException(`Sign-in with GitHub failed: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('profile/:userId')
    async getProfile(@Param('userId') userId: string) {
        try {
            // Fetch the user profile from the 'profiles' table using the userId
            const profile = await this.supabaseService.getProfileByUserId(userId);

            if (!profile) {
                throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
            }

            return profile; // Return the profile data
        } catch (error) {
            throw new HttpException('Error fetching profile', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('change-password')
    async changePassword(@Body() body: { newPassword: string, currentPassword: string }) {
        const { newPassword, currentPassword } = body;
        try {
            const user = await this.supabaseService.changePassword(newPassword, currentPassword);
            return { message: 'Password changed successfully', user };
        } catch (error) {
            throw new HttpException(`Failed to change password: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }
}
