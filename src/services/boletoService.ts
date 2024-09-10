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

    
    if (!nome || !valor || !dataVencimento || !email) {
      Logger.error('Dados do boleto inválidos. Verifique os campos fornecidos.');
      return;
    }

    let boletoId: string;
    try {
      boletoId = uuidv4();
    } catch (error) {
      Logger.error('Erro ao gerar ID do boleto.');
      Logger.error(error instanceof Error ? error.message : 'Erro desconhecido');
      return;
    }

    if (processedBoletoService.isBoletoProcessed(boletoId)) {
      Logger.info(`Boleto já processado: ${boletoId}`);
      return;
    }

    try {
      Logger.info(`Gerando boleto para: ${nome}, valor: ${valor}, vencimento: ${dataVencimento}`);
      processedBoletoService.addBoleto({ id: boletoId, nome, valor, email });
      // Logger.info(`Boleto gerado e adicionado à lista de processados: ${boletoId}`);
    } catch (error) {
      Logger.error('Erro ao processar o boleto.');
      Logger.error(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  }
}
