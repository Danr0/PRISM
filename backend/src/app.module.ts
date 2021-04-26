import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';
import { ErrorsModule } from './errors/errors.module';


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        MailsModule,
        ErrorsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
