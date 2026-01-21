import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { CreateWorkspaceDto } from './DTO/create-workspace';
import { User } from '../users/entities/users.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private workspacesRepository: Repository<Workspace>,
  ) {}

  async create(
    createWorkspaceDto: CreateWorkspaceDto,
    user: User,
  ): Promise<Workspace> {
    const workspace = this.workspacesRepository.create({
      ...createWorkspaceDto,
      owner: user, // <--- Link the workspace to the logged-in user
    });
    return this.workspacesRepository.save(workspace);
  }

  async findAllForUser(user: User): Promise<Workspace[]> {
    return this.workspacesRepository.find({
      where: { owner: { id: user.id } },
      relations: ['owner'], // Optional: load owner details if needed
    });
  }
}
