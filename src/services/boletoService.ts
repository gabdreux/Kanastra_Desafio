import { Logger } from '../utils/logger';
import { processedBoletoService } from './processedBoletoService';
import { v4 as uuidv4 } from 'uuid'; 

interface BoletoData {
  nome: string;
  valor: number;
  dataVencimento: string;
  email: string;
}

export class BoletoService {
  static generateBoleto(data: BoletoData): void {
    const { nome, valor, dataVencimento, email } = data;
    const boletoId = uuidv4();

    if (processedBoletoService.isBoletoProcessed(boletoId)) {
      Logger.info(`Boleto já processado: ${boletoId}`);
      return;
    }


    Logger.info(`Gerando boleto para: ${nome}, valor: ${valor}, vencimento: ${dataVencimento}`);
    
    processedBoletoService.addBoleto({ id: boletoId, nome, valor, email });

    // Logger.info(`Boleto gerado e adicionado à lista de processados: ${boletoId}`);
  }
}

