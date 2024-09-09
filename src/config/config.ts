import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  LOG_FILE_PATH: string;
}


const config: Config = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || './logs/app.log',
};


export default config;
