import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create_card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  // 👇 ENSURE THIS LOOKS LIKE THIS
  @Get(':listId')
  findAll(@Param('listId') listId: string) {
    return this.cardsService.findAllByList(listId);
  }
}
