import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Employee{
    // this a primary key which add on DB
    @PrimaryGeneratedColumn()
    id: number;
    // this is column which is add on the DB
    @Column()
    name: string;

    @Column()
    position: string;

    @Column()
    department: string;
}