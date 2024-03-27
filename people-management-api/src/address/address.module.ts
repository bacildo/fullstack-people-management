import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import { HttpModule } from '@nestjs/axios';
import { PeopleModule } from '../people/people.module'; // Importe o PeopleModule

@Module({
  imports: [TypeOrmModule.forFeature([Address]), HttpModule, PeopleModule], // Adicione o PeopleModule aqui
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
