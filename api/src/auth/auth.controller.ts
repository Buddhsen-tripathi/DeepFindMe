import { Controller, Post, HttpStatus, HttpException, Body } from '@nestjs/common';
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
            const session = await this.supabaseService.signInWithEmailPassword(signInDto);
            return { message: 'Sign-in successful', session };
        } catch (error) {
            throw new HttpException(`Sign-in failed: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    // Route to initiate Google OAuth sign-in
    @Post('signin-google')
    async signInWithGoogle() {
        try {
            const session = await this.supabaseService.signInWithOAuth('google');
            return { message: 'Sign in with Google successful', session };
        } catch (error) {
            throw new HttpException(`Sign-in with Google failed: ${error.message}`, HttpStatus.BAD_REQUEST);
        }
    }

    // Route to initiate GitHub OAuth sign-in
    @Post('signin-github')
    async signInWithGithub() {
        try {
            const session = await this.supabaseService.signInWithOAuth('github');
            return { message: 'Sign in with GitHub successful', session };
        } catch (error) {
            return { message: `Sign-in with GitHub failed: ${error.message}`, error: error.message };
        }
    }
}
