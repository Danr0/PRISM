import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {Users} from "./entities/users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>) {
    }

    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<Users> {
        return await this.usersRepository.findOne(id);
    }

    async findByUsername(username: string): Promise<Users> {
        return await this.usersRepository.findOne({
            where: {
                username: username
            }
        });
    }

    async deleteUser(id: number) {
        await this.usersRepository.delete(id);
        return {
            result: "Success"
        }

    }

    async createUser(createUserDto: CreateUserDto) {
        try {
            const user = await this.usersRepository.create(createUserDto);
            return await this.usersRepository.save(user);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    async updateCurrentUser(updateUserDto: UpdateUserDto, id: number) {
        const user = await this.findOne(id);
        if (await user.comparePassword(updateUserDto.oldPassword)) {
            if (updateUserDto.email) {
                user.email = updateUserDto.email;
            }
            if (updateUserDto.avatar) {
                user.avatar = updateUserDto.avatar;
            }
            if (updateUserDto.password) {
                user.password = updateUserDto.password;
                await user.hashPassword();
            }

            await this.usersRepository.save(user);
            return {
                result: "Success"
            }
        } else {
            return {
                result: "Incorrect password"
            }
        }
    }

}