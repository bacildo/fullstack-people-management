import { createConnection } from 'typeorm';
import { Person } from './people/person.entity';

async function createDatabaseScript() {
  const connection = await createConnection({
    type: 'mysql',
    database: 'people_db',
    entities: [Person],
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
    dateOfBirth VARCHAR(255),
    maritalStatus VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    localidade VARCHAR(255) NOT NULL,
    uf VARCHAR(255) NOT NULL
  )`);

  // Inserção de dados de exemplo
  await connection
    .getRepository(Person)
    .save([
      {
        name: 'Fulano',
        gender: 'Masculino',
        dateOfBirth: '10/11/1986',
        maritalStatus: 'Solteiro',
        cep: '12345-678',
        address: 'Rua A',
        number: '123',
        complement: 'Apto 101',
        neighborhood: 'Bairro 1',
        state: 'SP',
        city: 'São Paulo',
        uf: 'SP',
      },
    ]);

  await connection.close();
}

createDatabaseScript()
  .then(() => {
    console.log('Script de criação da base de dados executado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      'Erro ao executar script de criação da base de dados:',
      error,
    );
    process.exit(1);
  });
