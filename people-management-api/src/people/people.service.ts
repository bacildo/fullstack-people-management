import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    return await this.peopleRepository.find();
  }

  async findById(id: number): Promise<Person[]> {
    return await this.peopleRepository.find({where:{id:id}});
  }
  
  async create(person: Person): Promise<Person> {
    return await this.peopleRepository.save(person);
  }

  async update(id: any, person: Person): Promise<Person> {
    await this.peopleRepository.update(id, person);
    return await this.peopleRepository.findOne({where:{id:id}});
  }

  async delete(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }
}
