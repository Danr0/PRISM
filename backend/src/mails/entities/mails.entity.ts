import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({
    name: "mails"
})
export class Mails {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: string

    @Column()
    from: string

    @Column()
    to: string

    @Column()
    subject: string

    @Column()
    body: string

    @Column()
    attachments: string
}