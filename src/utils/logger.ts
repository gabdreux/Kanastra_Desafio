import winston from 'winston';
import path from 'path';

const logFilePath = path.resolve(__dirname, '../../logs/application.log');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath }),
  ],
});

export { logger as Logger };
