import { Module, Global } from '@nestjs/common';
import { EventsGateway } from './event.gateway'; // Make sure filename matches yours

@Global() // 👈 This makes it available everywhere automatically
@Module({
  providers: [EventsGateway],
  exports: [EventsGateway], // 👈 Share the instance
})
export class EventsModule {}
