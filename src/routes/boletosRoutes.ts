import { Router } from 'express';
import { generateBoletosAndSendEmails } from '../controllers/boletosController';

const router = Router();


router.get('/gerar-boletos', generateBoletosAndSendEmails);


export default router;
