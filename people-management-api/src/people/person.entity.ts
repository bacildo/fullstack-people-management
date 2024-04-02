import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: string;

  @Column()
  maritalStatus: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  uf: string;

}
