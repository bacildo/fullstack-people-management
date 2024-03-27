import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { Person } from './people/person.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'people_db',
      entities: [Person],
      synchronize: true,
      host: 'localhost',
      port: 3306,
      username: 'dev',
      password: 'dev',
      keepConnectionAlive: true,
    }),
    PeopleModule,
  ],
})
export class AppModule {}
