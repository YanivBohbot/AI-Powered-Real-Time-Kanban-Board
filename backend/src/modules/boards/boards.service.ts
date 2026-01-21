import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Workspace } from '../workspaces/entities/workspace.entity';
import { EventsGateway } from 'src/events/event.gateway'; // Ensure filename matches exactly

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
    private eventsGateway: EventsGateway, // 👈 Injected Gateway
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    // 1. Find the workspace first
    const workspace = await this.workspacesRepository.findOne({
      where: { id: createBoardDto.workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // 2. Create the board
    const board = this.boardsRepository.create({
      title: createBoardDto.title,
      workspace: workspace,
    });

    const savedBoard = await this.boardsRepository.save(board);

    // 👇 3. NEW: Broadcast "Board Created" Event
    // This tells the Dashboard to refresh automatically
    this.eventsGateway.server.emit('board-created', savedBoard);

    return savedBoard;
  }

  async findAllByWorkspace(workspaceId: string) {
    return this.boardsRepository.find({
      where: { workspace: { id: workspaceId } },
      relations: ['lists'],
    });
  }

  async findOne(id: string) {
    return this.boardsRepository.findOne({
      where: { id },
      relations: ['lists', 'lists.cards'], // Load Lists AND Cards
      order: {
        lists: { order: 'ASC' },
        // Note: nested ordering in TypeORM can be tricky,
        // we might sort cards in frontend or use a more complex query here.
      },
    });
  }
}
