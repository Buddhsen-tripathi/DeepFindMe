import { Module } from '@nestjs/common';
import { NotifyService } from '../service/notify.service';
import { NotifyController } from '../controller/notify.controller';
import { SharedModule } from './shared.module'; 

@Module({
  imports: [SharedModule], 
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
