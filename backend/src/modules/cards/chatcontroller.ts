import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/cards.entity';
import { AiService } from './ai.service';
import { List } from '../lists/entities/list.entity';

@Controller('chat')
export class ChatController {
  constructor(
    private aiService: AiService,
    @InjectRepository(Card) private cardRepo: Repository<Card>,
    @InjectRepository(List) private listRepo: Repository<List>,
  ) {}

  @Post()
  async chat(@Body() body: { message: string; boardId: string }) {
    // 1. Fetch all lists and cards for this board
    const lists = await this.listRepo.find({
      where: { board: { id: body.boardId } },
      relations: ['cards'],
      order: { order: 'ASC' },
    });

    if (!lists) {
      throw new NotFoundException('Board context not found');
    }

    // 2. Prepare context for AI (Simplify the data to save tokens)
    const boardContext = lists.map((list) => ({
      listName: list.title,
      tasks: list.cards.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        summary: card.aiSummary,
      })),
    }));

    // 3. Ask the AI
    const answer = await this.aiService.chatWithBoard(
      body.message,
      boardContext,
    );

    return { answer };
  }
}
