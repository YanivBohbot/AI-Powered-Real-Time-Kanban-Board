import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './DTO/create-workspace';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // <--- Only logged-in users can create
  create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Request() req) {
    // req.user contains the user info extracted from the Token
    return this.workspacesService.create(createWorkspaceDto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) // <--- Only logged-in users can see their workspaces
  findAll(@Request() req) {
    return this.workspacesService.findAllForUser(req.user);
  }
}
