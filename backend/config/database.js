import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o __dirname no escopo de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'), // O arquivo database.sqlite será criado na raiz do seu projeto (pasta 'backend')
  logging: false, // Desabilita o log de queries SQL no console (opcional, mas recomendado para produção)
});

export default sequelize;
