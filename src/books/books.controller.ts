import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { BooksService } from './books.service';
import { FilterBooksDto } from './dto/filter-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags,ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/user.dto';


@UseGuards(JwtAuthGuard)
@Controller('')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    description: 'Create a new book',
    type: CreateUserDto,
    required: true,
    examples: {
      example1: {
        value: {
          "title": "",
          "author": "",
          "publicationYear": "",
          "details": {
              "publishingCompany": "",
              "rating": ""
          }
        },
        description: 'Example of a new user object',
      },
    },
  })
  @ApiTags('Books')
  @Post()
  async create(@Body() bookDto: CreateBookDto) {
    return this.booksService.create(bookDto);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Find all books' })
  @ApiResponse({
    status: 200,
    description: 'Book retrieved successfully',
  })
  @Get()
  async findAll(@Query() paramiters) {
    return this.booksService.findAll(paramiters);
  }
  @ApiTags('Books')
  @ApiOperation({ summary: 'Get book details', description: 'Retrieves the details of a book by its ID' })
  @Get(':bookId/details')
  async getDetails(@Param('bookId') bookId: object) {
    return this.booksService.getDetailsById(bookId);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Find one books' })
  @Get(':bookId')
  async findOne(@Param('id') bookId: string) {
    return this.booksService.findById(bookId);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiBody({ type: UpdateBookDto })
  @Put(':bookId')
  async update(@Param('bookId') bookId: ObjectId, @Body() bookDto: UpdateBookDto) {
    return this.booksService.update(bookId, bookDto);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @Delete(':bookId')
  async remove(@Param('bookId') bookId: string) {
    return this.booksService.delete(bookId);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Rent books' })
  @Put(':bookId/rent')
  async rent(@Query('userId') userId: string, @Param('bookId') bookId: string) {
    return this.booksService.rentBook(userId, bookId);
  }

  @ApiTags('Books')
  @ApiOperation({ summary: 'Return books' })
  @Put(':bookId/return')
  async returnBook(@Param('bookId') bookId: string) {
    return this.booksService.returnBook(bookId);
  }
}