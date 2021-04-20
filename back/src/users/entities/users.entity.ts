import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
  name: 'users'
})
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  name: string;
}