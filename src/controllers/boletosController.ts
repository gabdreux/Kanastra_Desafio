import { Request, Response } from 'express';
import { Logger } from '../utils/logger';
import { processCsvFile } from '../services/processCsvService';
import { BoletoService } from '../services/boletoService';
import { EmailService } from '../services/emailService';
import path from 'path';



export const generateBoletosAndSendEmails = async (req: Request, res: Response): Promise<void> => {
  try {

    const filePath = path.resolve(__dirname, '../../uploads/input.csv');
    const csvData = await processCsvFile(filePath);

    for (const data of csvData) {
      const boletoData = {
        nome: data.name,
        valor: parseFloat(data.debtAmount),
        dataVencimento: data.debtDueDate,
      };

      BoletoService.generateBoleto(boletoData);

      EmailService.sendEmail({
        email: data.email,
        subject: 'Seu Boleto de Cobrança',
        message: `Olá ${data.name}, seu boleto de R$ ${boletoData.valor} com vencimento em ${boletoData.dataVencimento} foi gerado.`,
      });
    }


    res.status(200).send({ message: 'Boletos gerados e e-mails enviados com sucesso!' });

  } catch (error: unknown) {
    if (error instanceof Error) {
      Logger.error(`Erro ao processar boletos e enviar e-mails: ${error.message}`);
      res.status(500).send({ error: 'Erro ao processar a requisição' });
    } else {
      Logger.error(`Erro inesperado: ${String(error)}`);
      res.status(500).send({ error: 'Erro inesperado' });
    }
  }
};
