import 'dotenv/config';
import { get } from 'env-var';
// objeto para esponer las variables de entorno y validarlas sin necesidad de usar process.env

/**
 * Configuration object for environment variables.
 */
export const envs = {
  /**
   * The port number for the server.
   */
  PORT: get('PORT').required().asPortNumber(),

  /**
   * The base URL for the server.
   */
  BASE_URL: get('BASE_URL').required().asString(),

  /**
   * The name of the database.
   */
  DB_NAME: get('DB_NAME').required().asString(),

  /**
   * The secret key for JSON Web Tokens.
   */
  JWT_SECRET: get('JWT_SECRET').required().asString(),
}



