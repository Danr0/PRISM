import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Mails} from "./entities/mails.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {CreateMailDto} from "./dto/create-mail.dto";
import {Users} from "../users/entities/users.entity";

@Injectable()
export class MailsService {
    constructor(
        @InjectRepository(Mails)
        private mailsRepository: Repository<Mails>,
        private usersService: UsersService) {
    }

    async createNewMail(createMailDto: CreateMailDto, user: Users): Promise<Mails> {
        try {
            const mail = new Mails();
            const usr = await this.usersService.findByUsername(user.username);
            mail.body = createMailDto.body;
            mail.attachments = JSON.stringify(createMailDto.attachments);
            mail.subject = createMailDto.subject;
            mail.from = createMailDto.from;
            mail.to = JSON.stringify(createMailDto.to);
            mail.user_id = usr.id;
            return await this.mailsRepository.save(mail);
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException();
        }
    }

    async getAllMails(user: Users): Promise<Mails[]> {
        try {
            return await this.mailsRepository.find({
                where: {
                    user_id: user.id
                }
            });
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException();
        }
    }


}
