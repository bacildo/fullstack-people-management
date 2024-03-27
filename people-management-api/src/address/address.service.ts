// AddressService
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressDTO } from '../dto/address';
import { Person } from 'src/people/person.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly httpService: HttpService,
  ) {}

  async create(createAddressDto: AddressDTO, person: Person): Promise<Address> {
    const newAddress = this.addressRepository.create({
      ...createAddressDto,
      person: person,
    });
    return await this.addressRepository.save(newAddress);
  }

  async getAddressByCEP(cep: string): Promise<AddressDTO> {
    const response = await firstValueFrom(
      this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`),
    );

    const { data } = response;

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    return {
      cep: data.cep,
      address: data.logradouro,
      number: '',
      complement: data.complemento,
      neighborhood: data.bairro,
      city: data.localidade,
      uf: data.uf,
    };
  }
}



