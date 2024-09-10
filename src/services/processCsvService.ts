import fs from 'fs';
import { parse } from 'fast-csv';

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
    fs.createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on('data', (row: CsvData) => {
        if (Object.values(row).every(value => value !== undefined && value !== null && value.trim() !== '')) {
          results.push(row);
        }
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};