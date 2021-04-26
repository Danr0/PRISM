import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:"errors"})
export class errors {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    mail_id: string

    @Column()
    err_msg: string

    @Column()
    to: string
}
