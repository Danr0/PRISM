import {Body, Controller, Get, HttpCode, Inject, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {MailsService} from './mails.service';
import {AuthGuard} from "@nestjs/passport";
import {CreateMailDto} from "./dto/create-mail.dto";
import {ClientProxy} from "@nestjs/microservices";

@Controller('/api/mails')
export class MailsController {
    constructor(private readonly mailsService: MailsService,
                @Inject('MAIL_SERVICE') private readonly client:ClientProxy
                ) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(200)
    async createNewMail(@Request() req, @Body() createMailDto: CreateMailDto) {
            const saved_mail = await this.mailsService.createNewMail(createMailDto,req.user);
            await this.mailsService.createNewTask(createMailDto, saved_mail);
            return(
                saved_mail
            )
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllMails(@Request() req) {
            return(
                this.mailsService.getAllMails(req.user)
            )
    }

}
