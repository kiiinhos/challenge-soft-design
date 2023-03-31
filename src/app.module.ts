import * as dotenv  from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { AppGateway } from './app.gateway';
import { UsersModule } from './user/users.module';



@Module({
  
  imports: 
  [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    BooksModule,
    AppGateway,
    UsersModule,
  ],
  
})

export class AppModule {}
