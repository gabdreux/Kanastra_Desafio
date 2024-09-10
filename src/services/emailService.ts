import { Logger } from '../utils/logger';

interface EmailData {
  email: string;
  subject: string;
  message: string;
}

export abstract class EmailService {
  static sendEmail(data: EmailData): void {
    try {
      const { email, subject, message } = data;

      if (!email || !this.isValidEmail(email)) {
        throw new Error('Endereço de e-mail inválido.');
      }
      if (!subject || subject.trim() === '') {
        throw new Error('Assunto inválido.');
      }
      if (!message || message.trim() === '') {
        throw new Error('Mensagem inválida.');
      }

      const timestamp = new Date().toISOString();

      Logger.info(`Email enviado para: ${email}, assunto: "${subject}", mensagem: "${message}", data: ${timestamp}`);

    } catch (error) {
      if (error instanceof Error) {
        Logger.error(`Erro ao enviar e-mail: ${error.message}`);
      } else {
        Logger.error('Erro desconhecido ao enviar e-mail.');
      }
    }
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

