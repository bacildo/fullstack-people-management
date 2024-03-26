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
      ddd: data.ddd,
      gia: data.gia,
      ibge: data.ibge,
      city: data.localidade,
      siafi: data.siafi,
      uf: data.uf,
      id: data.id,
      person: data.person,

      // personId: null, // Você precisa ajustar isso de acordo com a lógica da sua aplicação
    };

    return this.addressService.create(address);
  }
}
