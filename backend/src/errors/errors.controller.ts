import {Controller, Get, Param, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {ErrorsService} from "./errors.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateErrorDto} from "./dto/create-error.dto";

export class err_msg{
    err_msg: string;
    mail_id: string;
    to: string;
}

@Controller('/api/errors')
export class ErrorsController {
    constructor(private readonly errorService: ErrorsService){
    }


    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getErrors(@Request() req, @Param('id') id: string){
        return this.errorService.getErrorsById(id, req.user);
    }

    @MessagePattern('error')
    getNotifications(@Payload() data: err_msg, @Ctx() context: RmqContext) {
        this.errorService.createNewError(data);
    }
}
