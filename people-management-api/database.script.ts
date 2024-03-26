// database.scripts.ts

import { createConnection } from 'typeorm';
import { Person } from './src/people/person.entity';
import { Address } from './src/address/address.entity';

async function createDatabaseScript() {
  const connection = await createConnection();

  // Criação das tabelas
  await connection.query(`CREATE TABLE IF NOT EXISTS person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    marital_status VARCHAR(255) NOT NULL
  )`);

  await connection.query(`CREATE TABLE IF NOT EXISTS address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    complement VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    uf VARCHAR(255) NOT NULL,
    personId INT NOT NULL,
    FOREIGN KEY (personId) REFERENCES person(id)
  )`);

  // Inserção de dados de exemplo
  const personRepository = connection.getRepository(Person);
  const addressRepository = connection.getRepository(Address);

  const fulano = await personRepository.save({
    name: 'Fulano',
    gender: 'Masculino',
    dateOfBirth: new Date(1990, 0, 1),
    maritalStatus: 'Solteiro',
  });

  const ciclana = await personRepository.save({
    name: 'Ciclana',
    gender: 'Feminino',
    dateOfBirth: new Date(1995, 5, 15),
    maritalStatus: 'Casada',
  });

  await addressRepository.save([
    {
      cep: '12345-678',
      address: 'Rua A',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Bairro 1',
      city: 'São Paulo',
      uf: 'SP',
      personId: fulano.id, // Utiliza o ID da pessoa correspondente
    },
    {
      cep: '54321-876',
      address: 'Rua B',
      number: '456',
      complement: '',
      neighborhood: 'Bairro 2',
      city: 'Rio de Janeiro',
      uf: 'RJ',
      personId: ciclana.id, // Utiliza o ID da pessoa correspondente
    },
  ]);

  await connection.close();
}

createDatabaseScript()
  .then(() => {
    console.log('Script de criação da base de dados executado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao executar script de criação da base de dados:', error);
  });
