import {Module} from '@nestjs/common';
import {MailsService} from './mails.service';
import {MailsController} from './mails.controller';
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mails} from "./entities/mails.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [UsersModule,
        TypeOrmModule.forFeature([Mails]),
        ClientsModule.register([
            {
                name: 'MAIL_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${(process.env.docker === 'y' ? process.env.RABBIT_ALIAS : process.env.RABBIT_HOST)}:${process.env.RABBIT_PORT}`],
                    queue: process.env.RABBIT_QUEUE_NAME,
                    queueOptions: {
                        durable: true
                    },
                },
            },
        ]),
    ],
    controllers: [MailsController],
    providers: [MailsService],
    exports: [MailsService]
})
export class MailsModule {
}
