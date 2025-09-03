import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import useRoutes from './routes/userRoute.js';
import sequelize from './config/database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(useRoutes);

//----------------------------------------------------------------------------------
// Start the server
//---------------------------------------------------------------------------

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando e escutando na porta http://localhost:${PORT}` );
    console.log('✅ Banco de dados sincronizado.');
  });
}).catch(err => {
  console.error('❌ Não foi possível sincronizar o banco de dados:', err);
});

export default app;