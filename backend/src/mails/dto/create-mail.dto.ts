import {IsNotEmpty} from "class-validator";

class Attachment {
    filename: string;

    content: string;

    encoding: string;
}

class TransporterObject {
    host: string;
    port: number;
    secure: boolean;
    auth?: {
        user: string;
        pass: string;
    };
    tls?: {
        ciphers:string;
    }
}

export class CreateMailDto {

    @IsNotEmpty()
    body: string;

    attachments: Attachment[];

    from: string;

    to: string[];

    subject: string;

    transporter: TransporterObject;

}