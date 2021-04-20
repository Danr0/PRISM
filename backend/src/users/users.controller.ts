import {
    Body,
    Controller,
    Get,
    Request,
    HttpCode,
    Param,
    Post,
    Put,
    UnauthorizedException,
    UseGuards, Delete
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthGuard} from "@nestjs/passport";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('/api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getCurrentUser(@Request() req) {
        if (req.user) {
            return {
                username: req.user.username,
                email: req.user.email,
                avatar: req.user.avatar
            }
        }
        throw new UnauthorizedException();
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async deleteCurrentUser(@Request() req) {
        if (req.user) {
            return await this.usersService.deleteUser(req.user.id);
        }
        throw new UnauthorizedException();
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    async updateCurrentUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        if (req.user) {
            return await this.usersService.updateCurrentUser(updateUserDto, req.user.id);
        }
        throw new UnauthorizedException();
    }
}