import {IsNotEmpty} from "class-validator";


export class CreateErrorDto {

    @IsNotEmpty()
    mail_id: string

    err_msg: string

    to: string

}