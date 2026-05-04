import 'dotenv/config';
import express from 'express';
import Routes from './routes/index.js';
import './models/index.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import criarPerfisPadroes from './utils/seedPerfis.js';

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(fileUpload({ createParentPath: true }));
app.use('/public', express.static('public'));
app.use(
    cors({
        origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    })
);

Routes(app);

// Criar perfis padrões ao iniciar
criarPerfisPadroes();

app.listen(process.env.API_PORT, () => {
    console.log('Sistema rodando na porta ' + process.env.API_PORT);
});






