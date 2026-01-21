import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dtos/create_list.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('lists')
@UseGuards(AuthGuard('jwt'))
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @Get(':boardId')
  findAll(@Param('boardId') boardId: string) {
    return this.listsService.findAllByBoard(boardId);
  }
}
