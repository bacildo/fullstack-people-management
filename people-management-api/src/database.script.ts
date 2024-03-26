import { createConnection } from 'typeorm';
import { Person } from './people/person.entity';
import { Address } from './address/address.entity';

async function createDatabaseScript() {
  const connection = await createConnection({
    type: 'mysql',
    database: 'people_db',
    entities: [Person, Address],
    synchronize: true,
    host: 'localhost',
    port: 3306,
    username: 'dev',
    password: 'dev',
  });

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
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    localidade VARCHAR(255) NOT NULL,
    uf VARCHAR(255) NOT NULL,
    person_id INT NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(id)
  )`);

  // Inserção de dados de exemplo
  await connection.getRepository(Person).save([
    { name: 'Fulano', gender: 'Masculino', dateOfBirth: new Date(1990, 0, 1), maritalStatus: 'Solteiro' },
    { name: 'Ciclana', gender: 'Feminino', dateOfBirth: new Date(1995, 5, 15), maritalStatus: 'Casada' },
  ]);

  await connection.getRepository(Address).save([
    { cep: '12345-678', address: 'Rua A', number: '123', complement: 'Apto 101', neighborhood: 'Bairro 1', state: 'SP', city: 'São Paulo', uf: 'SP', personId: 1 },
    { cep: '54321-876', address: 'Rua B', number: '456', complement: '', neighborhood: 'Bairro 2', state: 'RJ', city: 'Rio de Janeiro', uf: 'RJ',personId: 2 },
  ]);

  await connection.close();
}

createDatabaseScript().then(() => {
  console.log('Script de criação da base de dados executado com sucesso!');
  process.exit(0);
}).catch(error => {
  console.error('Erro ao executar script de criação da base de dados:', error);
  process.exit(1);
});
