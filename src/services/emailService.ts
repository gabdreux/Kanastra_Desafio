import { Logger } from '../utils/logger';

interface EmailData {
  email: string;
  subject: string;
  message: string;
}

export abstract class EmailService {
  static sendEmail(data: EmailData): void {
    const { email, subject, message } = data;
    const timestamp = new Date().toISOString();

    Logger.info(`Email enviado para: ${email}, assunto: "${subject}", mensagem: "${message}", data: ${timestamp}`);
  }
}