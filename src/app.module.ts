import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    // this is the process of instially the database(PostgreSql)
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // autoloadEntities is help to auto load the entity like when you run the project they are auto initally the database
      autoLoadEntities: true,
      // synchronize is help tu start the entity on superbase (PostgreSQL)
      synchronize: true
    }),
    UserModule,
    EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
