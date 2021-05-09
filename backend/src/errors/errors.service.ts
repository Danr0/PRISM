import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Repository} from "typeorm";
import {errors} from "./entities/errors.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateErrorDto} from "./dto/create-error.dto";
import {Users} from "../users/entities/users.entity";
import {MailsService} from "../mails/mails.service";
import {err_msg} from "./errors.controller";


@Injectable()
export class ErrorsService {
    constructor(
        @InjectRepository(errors)
        private errorRepository: Repository<errors>,
        private mailsService: MailsService) {
    }

    /*
    async createNewError(createErrorDto: CreateErrorDto): Promise<errors> {
        try {
            const err = new errors();
            err.err_msg = createErrorDto.err_msg;
            err.mail_id = createErrorDto.mail_id;
            err.to = createErrorDto.to;
            return await this.errorRepository.save(err);
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException();
        }
    }

     */
    async createNewError(data: err_msg): Promise<errors> {
        try {
            const err = new errors();
            err.err_msg = JSON.stringify(data.err_msg);
            err.mail_id = data.mail_id;
            err.to = data.to;
            return await this.errorRepository.save(err);
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException();
        }
    }

    async getErrorsById(find_id: string, user: Users): Promise<errors[]> {
        try {
            const mail = await this.mailsService.getMailById(find_id, user);
            return await this.errorRepository.find({
                where:{
                    mail_id: mail.id
                }
            })

        } catch (e) {
            console.error(e);
            throw new UnauthorizedException();
        }

    }
}
