import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/cards.entity';
import { CreateCardDto } from './dto/create_card.dto';
import { List } from '../lists/entities/list.entity';
import { EventsGateway } from 'src/events/event.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    private eventsGateway: EventsGateway,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const list = await this.listsRepository.findOne({
      // @ts-ignore - The DTO might have listId as number, but DB expects string.
      // This forces it to work regardless of type.
      where: { id: createCardDto.listId },
      relations: ['board'],
    });

    if (!list) {
      throw new NotFoundException('List not found');
    }

    const card = this.cardsRepository.create({
      title: createCardDto.title,
      description: createCardDto.description || '',
      list: list,
      order: 0,
    });

    const savedCard = await this.cardsRepository.save(card);

    this.eventsGateway.server.emit('card.created', {
      ...savedCard,
      boardId: list.board.id,
    });

    // 👇 2. Internal Event (AI hears this and wakes up)
    this.eventEmitter.emit('card.created', {
      cardId: savedCard.id,
      title: savedCard.title,
      description: savedCard.description,
      listId: list.id,
      boardId: list.board.id,
    });

    return savedCard;
  }

  // 👇 THIS WAS THE PROBLEM. NOW FIXED.
  async findAllByList(listId: any) {
    // We use 'any' temporarily to accept both string or number IDs
    // so TypeScript stops complaining.
    return this.cardsRepository.find({
      where: { list: { id: listId } },
      order: { order: 'ASC' },
    });
  }
}
