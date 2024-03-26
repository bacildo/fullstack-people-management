import { Controller, Post, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';
import axios from 'axios';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('query-cep')
  async queryCEP(@Body() { cep }: { cep: string }): Promise<Address> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    const data = response.data;

    const address: Address = {
      cep: data.cep,
      address: data.logradouro,
      neighborhood: data.bairro,
      complement: data.complemento,
      city: data.localidade,
      uf: data.uf,
      id: data.id,
      person: data.person.id,
    };

    return this.addressService.create(address);
  }
}
