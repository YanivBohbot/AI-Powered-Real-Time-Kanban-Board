import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dtos/create_list.dto';
import { Board } from '../boards/entities/board.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createListDto: CreateListDto) {
    const board = await this.boardsRepository.findOne({
      where: { id: createListDto.boardId },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const list = this.listsRepository.create({
      title: createListDto.title,
      order: createListDto.order,
      board: board,
    });

    return this.listsRepository.save(list);
  }

  async findAllByBoard(boardId: string) {
    return this.listsRepository.find({
      where: { board: { id: boardId } },
      order: { order: 'ASC' }, // Sort by position (1, 2, 3...)
      relations: ['cards'], // We will load cards later
    });
  }
}
