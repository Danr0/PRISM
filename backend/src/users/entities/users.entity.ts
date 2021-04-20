import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import * as bcrypt from 'bcrypt'
import {Mails} from "../../mails/entities/mails.entity";

@Entity({
    name: "users"
})
export class Users {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,10);
    }

    async comparePassword(attempt : string) : Promise<Boolean> {
        return await bcrypt.compare(attempt,this.password);
    }

    @Column({
        nullable: true
    })
    avatar: string

    @OneToMany(()=> Mails, mails => mails.user)
    mails: Mails[];
}