import { Module } from '@nestjs/common';
import { SupabaseService } from '../service/supabase.service';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService], // Export to make it available to other modules
})
export class SharedModule {}
