import {IsNotEmpty} from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    oldPassword: string;

    email: string;

    password: string;

    avatar: string;

}