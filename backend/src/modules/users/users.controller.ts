import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common'; // Import Get, UseGuards, Request
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create_user_dto';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // --- NEW PROTECTED ROUTE ---
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // If successful, this returns the user data from the token
  }
}
