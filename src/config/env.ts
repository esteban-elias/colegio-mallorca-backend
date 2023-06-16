import dotenv from 'dotenv';
dotenv.config();

function getEnvVariable(key: string) {
  const value = process.env[key];
  if (value === undefined || value.trim() === '') {
    throw new Error('Error de configuración del servidor');
  }
  return value;
}

export const DATABASE_URL = getEnvVariable('DATABASE_URL');
export const JWT_SECRET = getEnvVariable('JWT_SECRET');
export const JWT_EXPIRATION = getEnvVariable('JWT_EXPIRATION');
export const YEAR = getEnvVariable('YEAR');
export const SEMESTER = getEnvVariable('SEMESTER');

export const PORT: string =
  process.env.PORT !== undefined && process.env.PORT.trim() !== ''
    ? process.env.PORT
    : '3000';
