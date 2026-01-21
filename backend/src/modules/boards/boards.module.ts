import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import this
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { Workspace } from '../workspaces/entities/workspace.entity'; // Import this
import { EventsGateway } from 'src/events/event.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Workspace]), // <--- Add Workspace here!
  ],
  controllers: [BoardsController],
  providers: [BoardsService, EventsGateway],
})
export class BoardsModule {}
