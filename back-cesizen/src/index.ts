import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import infoRoutes from './routes/information.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ C'est bien le routeur qu'on utilise ici
app.use('/auth', authRoutes);

app.use('/infos', infoRoutes)

app.get('/', (_req, res) => {
  res.send('API CESIZen en TypeScript est en ligne');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
