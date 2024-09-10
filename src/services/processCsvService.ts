import fs from 'fs';
import { parse } from 'fast-csv';
import { Logger } from '../utils/logger';

interface CsvData {
  name: string;
  governmentId: string;
  email: string;
  debtAmount: string;
  debtDueDate: string;
  debtId: string;
}

export const processCsvFile = (filePath: string): Promise<CsvData[]> => {
  return new Promise((resolve, reject) => {
    const results: CsvData[] = [];

    if (!fs.existsSync(filePath)) {
      const errorMsg = `Arquivo CSV não encontrado: ${filePath}`;
      Logger.error(errorMsg);
      return reject(new Error(errorMsg));
    }

    const parser = parse({ headers: true });

    fs.createReadStream(filePath)
      .pipe(parser)
      .on('data', (row: CsvData) => {
        try {
          if (Object.values(row).every(value => value !== undefined && value !== null && value.trim() !== '')) {
            results.push(row);
          } else {
            Logger.warn(`Linha ignorada devido a dados inválidos: ${JSON.stringify(row)}`);
          }
        } catch (err) {
          if (err instanceof Error) {
            Logger.error(`Erro ao processar linha: ${JSON.stringify(row)}, erro: ${err.message}`);
          } else {
            Logger.error(`Erro desconhecido ao processar linha: ${JSON.stringify(row)}`);
          }
        }
      })
      .on('end', () => {
        Logger.info(`Arquivo CSV processado com sucesso: ${filePath}`);
        resolve(results);
      })
      .on('error', (err) => {
        if (err instanceof Error) {
          Logger.error(`Erro ao processar o arquivo CSV: ${err.message}`);
        } else {
          Logger.error(`Erro desconhecido ao processar o arquivo CSV`);
        }
        reject(err);
      });
  });
};
