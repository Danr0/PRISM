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

        if (req.user) {
            return(
                this.mailsService.createNewMail(createMailDto,req.user)
            )
        }
        throw new UnauthorizedException();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllMails(@Request() req) {
        if(req.user){
            return(
                this.mailsService.getAllMails(req.user)
            )
        }
        throw new UnauthorizedException();
    }

    @Post('test')
    @HttpCode(200)
    async test(@Request() req,  @Body() createMailDto: CreateMailDto) {
        let obj = {body:createMailDto.body,attachments: createMailDto.attachments,subject:createMailDto.subject,from:createMailDto.from,to:createMailDto.to};
        this.client.emit('mail', obj);
        return 'true';
    }
}
