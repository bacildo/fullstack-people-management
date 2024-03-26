import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from '../people/person.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  number?: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @ManyToOne(() => Person, (person) => person.addresses)
  person: Person;
}
