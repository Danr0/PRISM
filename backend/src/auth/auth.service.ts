import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {Users} from "../users/entities/users.entity";
import * as jwt from 'jsonwebtoken'
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);

        if (user && await user.comparePassword(pass)) {
            return user;
        }

        return null;
    }

    async registerUser(createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);
        if(!user) {
            return undefined;
        }
        return await this.createToken(user);

    }

    async validateToken(token: any): Promise<any> {
        return await this.userService.findOne(token.id);
    }

    async createToken(user: Users) {
        const statusCode = 200;
        const expiresIn = process.env.TOKEN_EXPIRE_TIME;
        const accessToken = jwt.sign({
                id: user.id,
                email: user.email
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn
            });

        return {
            expiresIn,
            accessToken,
            statusCode
        };
    }

}
