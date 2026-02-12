import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      user])
  ],
})
export class UserModule { }


// setup -- POSTGRESQL DB

// npm i @nestjs/config
//npm install @nestjs/typeorm (connection between the nestjs <---> PostgreSql)
// npm install pg (basically it is a driver of PostgreSQL)