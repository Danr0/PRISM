import {IsNotEmpty} from "class-validator";

export class CreateMailDto {

    @IsNotEmpty()
    body: string;

    attachments: string;

    from: string

    to: string

    subject: string

}