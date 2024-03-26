import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from '../address/address.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  maritalStatus: string;

  @OneToMany(() => Address, address => address.person)
  addresses: Address[];
}
