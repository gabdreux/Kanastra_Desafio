import { Logger } from '../utils/logger';

interface BoletoData {
  nome: string;
  valor: number;
  dataVencimento: string;
}

export abstract class BoletoService {

  static generateBoleto(data: BoletoData): void {
    const { nome, valor, dataVencimento } = data;
    const timestamp = new Date().toISOString();

    Logger.info(`Boleto gerado para: ${nome}, valor: ${valor}, vencimento: ${dataVencimento}, data: ${timestamp}`);
  }
  
}
