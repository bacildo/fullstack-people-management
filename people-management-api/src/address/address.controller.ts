// AddressController
import { Controller, Post, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { PeopleService } from '../people/people.service';
import { AddressDTO } from '../dto/address';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly peopleService: PeopleService,
  ) {}

  @Post()
  async create(@Body() addressData: any) {
    const { personId, cep } = addressData;
    const addressInfo = await this.addressService.getAddressByCEP(cep);
    const person = await this.peopleService.findById(personId);

    if (!person) {
      return { message: 'Pessoa não encontrada' };
    }

    const createAddressDto: AddressDTO = {
      cep: addressInfo.cep,
      address: addressInfo.address,
      number: addressInfo.number,
      complement: addressInfo.complement,
      neighborhood: addressInfo.neighborhood,
      city: addressInfo.city,
      uf: addressInfo.uf,
    };

    // Chame o método create do AddressService passando o CreateAddressDto e a pessoa
    await this.addressService.create(createAddressDto, person);

    // Atualizar a pessoa para incluir o novo endereço
    person.addresses.push();
    await this.peopleService.update(personId, person);

    return { message: 'Endereço cadastrado com sucesso', person };
  }
}
