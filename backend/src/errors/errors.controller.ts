import {Controller, Get, Param, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {ErrorsService} from "./errors.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateErrorDto} from "./dto/create-error.dto";

class err_msg{
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
        if (req.user) {
            return this.errorService.getErrorsById(id, req.user);
        }
        throw new UnauthorizedException();
    }

    @MessagePattern('error')
    getNotifications(@Payload() data: err_msg, @Ctx() context: RmqContext) {
        try {
            console.log(data);
            //console.log(in_data);
            //const data = JSON.parse(in_data);
            let err = new CreateErrorDto();
            err.mail_id = data.mail_id;
            err.err_msg = JSON.stringify(data.err_msg);
            err.to = data.to;
            this.errorService.createNewError(err);
        }
        catch (e)  {
            console.log(e);
        }

    }
}
