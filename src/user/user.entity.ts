import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id: number;  // denoted as a primary key

    @Column()
    name: string;

}