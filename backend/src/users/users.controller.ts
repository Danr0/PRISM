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
            return {
                username: req.user.username,
                email: req.user.email,
                avatar: req.user.avatar
            }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async deleteCurrentUser(@Request() req) {
            return await this.usersService.deleteUser(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    async updateCurrentUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
            return await this.usersService.updateCurrentUser(updateUserDto, req.user.id);
    }
}