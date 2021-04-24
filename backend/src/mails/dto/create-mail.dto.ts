import {IsNotEmpty} from "class-validator";

class Attachment {
    filename: string;

    content: string;

    encoding: string;
}

export class CreateMailDto {

    @IsNotEmpty()
    body: string;

    attachments: Attachment[];

    from: string

    to: string[]

    subject: string

}