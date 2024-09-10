import { Logger } from '../utils/logger';

interface BoletoData {
  nome: string;
  valor: number;
  dataVencimento: string;
}

export abstract class BoletoService {

  static generateBoleto(data: BoletoData): void {
    try {
      const { nome, valor, dataVencimento } = data;

      if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        throw new Error('Nome inválido.');
      }
      if (isNaN(valor) || valor <= 0) {
        throw new Error('Valor inválido.');
      }
      if (!dataVencimento || isNaN(Date.parse(dataVencimento))) {
        throw new Error('Data de vencimento inválida.');
      }

      const timestamp = new Date().toISOString();
      
      Logger.info(`Boleto gerado para: ${nome}, valor: ${valor}, vencimento: ${dataVencimento}, data: ${timestamp}`);

    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Erro ao gerar boleto: ${error.message}`);
      } else {
        Logger.error('Erro desconhecido ao gerar boleto.');
      }
    }
  }
}
