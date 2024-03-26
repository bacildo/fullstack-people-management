import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { Address } from './address/address.entity';
import { Person } from './people/person.entity';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'people_db',
      entities: [Person, Address],
      synchronize: true,
      host: 'localhost',
      port: 3306,
      username: 'dev',
      password: 'dev',
    }),
    PeopleModule,
    AddressModule,
  ],
})
export class AppModule {}
