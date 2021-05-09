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
            let to_mails = createMailDto.to;
            for (let entry of to_mails) {
                let obj = {body:createMailDto.body,attachments: createMailDto.attachments,subject:createMailDto.subject,from:createMailDto.from,to:entry,mail_id:saved_mail.id, transporter:createMailDto.transporter};
                this.client.emit('mail', obj);
            }
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

    /*
    @MessagePattern('error')
    getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
        console.log(data);
    }

    data:
    nodejs      | {
nodejs      |   err_msg: { code: 'EENVELOPE', command: 'API' },
nodejs      |   mail_id: 6,
nodejs      |   to: 'testtest.ee1'
nodejs      | }

    @Post('test')
    @HttpCode(200)
    async test(@Request() req,  @Body() createMailDto: CreateMailDto) {
        let to_mails = createMailDto.to;
        for (let entry of to_mails) {
            let obj = {body:createMailDto.body,attachments: createMailDto.attachments,subject:createMailDto.subject,from:createMailDto.from,to:entry};
            this.client.emit('mail', obj);
        }
        return 'true';
    }
     */
}
