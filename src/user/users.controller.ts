import { Controller, Get, Post, Body, Param,Query } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags,ApiBody } from '@nestjs/swagger';
import mongoose from 'mongoose';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    description: 'Create a new user',
    type: CreateUserDto,
    required: true,
    examples: {
      example1: {
        value: {
          name: 'string',
          password: 'string',
          email: 'string',
        },
        description: 'Example of a new user object',
      },
    },
  })
  @Post()
  async createUser(
      @Body() paylod: CreateUserDto,
  ): Promise<User> {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(paylod.password, saltOrRounds);
      const result = await this.userService.create(
          paylod,
          hashedPassword,
      );
      return result;
  }
  @ApiTags('Users')
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @ApiTags('Users')
  @ApiOperation({ summary: 'Get all users' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
  @ApiTags('Users')
  @ApiOperation({ summary: 'Books rent by user' })
  @Post(':userId/books/:bookId/rent')
  async rentBook(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ): Promise<User> {
    return this.userService.rentBook(userId, bookId);
  }
  
}
