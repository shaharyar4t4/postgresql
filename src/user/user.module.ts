import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      user])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }


// setup -- POSTGRESQL DB

// npm i @nestjs/config
//npm install @nestjs/typeorm (connection between the nestjs <---> PostgreSql)
// npm install pg (basically it is a driver of PostgreSQL)