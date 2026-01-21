import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard('jwt')) // Protect all board routes
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get(':workspaceId')
  findAll(@Param('workspaceId') workspaceId: string) {
    return this.boardsService.findAllByWorkspace(workspaceId);
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }
}
