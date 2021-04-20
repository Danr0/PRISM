import {Module} from '@nestjs/common';
import {MailsService} from './mails.service';
import {MailsController} from './mails.controller';
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mails} from "./entities/mails.entity";

@Module({
    imports: [UsersModule,
        TypeOrmModule.forFeature([Mails])
    ],
    controllers: [MailsController],
    providers: [MailsService]
})
export class MailsModule {
}
