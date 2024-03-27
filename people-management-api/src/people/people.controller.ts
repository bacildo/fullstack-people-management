import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PeopleService } from './people.service';
import { Person } from './person.entity';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async findAll(): Promise<Person[]> {
    return this.peopleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id:number): Promise<Person> {
    return this.peopleService.findById(id);
  }

  @Post()
  async create(@Body() person: Person): Promise<Person> {
    return this.peopleService.create(person);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() person: Person): Promise<Person> {
    return this.peopleService.update(id, person);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.peopleService.delete(id);
  }
}
