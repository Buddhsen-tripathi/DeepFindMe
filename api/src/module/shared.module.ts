import { Module } from '@nestjs/common';
import { SupabaseService } from '../service/supabase.service';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
  controllers:[]
})
export class SharedModule {}
