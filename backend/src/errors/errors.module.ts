import { Module } from '@nestjs/common';
import { ErrorsController } from './errors.controller';
import { ErrorsService } from './errors.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {errors} from "./entities/errors.entity";
import {MailsModule} from "../mails/mails.module";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
      MailsModule,
      UsersModule,
    TypeOrmModule.forFeature([errors])],
  controllers: [ErrorsController],
  providers: [ErrorsService]
})
export class ErrorsModule {}
