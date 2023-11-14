import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  BASE_URL: get('BASE_URL').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),

}



