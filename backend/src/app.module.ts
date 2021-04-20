import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {AuthController} from "./auth/auth.controller";
import { MailsModule } from './mails/mails.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UsersModule,
        AuthModule,
        MailsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
