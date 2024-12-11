import { Module } from '@nestjs/common';
import { SupabaseService } from '../service/supabase.service';
import { AuthController } from 'src/auth/auth.controller';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService], // Export to make it available to other modules
  controllers:[AuthController]
})
export class SharedModule {}
