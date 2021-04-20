import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import {Users} from "../../users/entities/users.entity";

@Entity({
    name: "mails"
})
export class Mails {

    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Users, user => user.mails)
    user: Users

    @Column()
    body: string

    @Column()
    attachments: string
}