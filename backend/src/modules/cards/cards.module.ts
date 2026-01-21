import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/cards.entity';
import { List } from '../lists/entities/list.entity';
import { CardListener } from './listners/card_listner';
import { ChatController } from './chatcontroller';
import { AiService } from './ai.service';
// import { EventsGateway } from 'src/events/event.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Card, List])],
  controllers: [CardsController, ChatController],
  providers: [CardsService, AiService, CardListener],
})
export class CardsModule {}
