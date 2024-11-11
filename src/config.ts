import dotenv from "dotenv";
import { DatabaseType } from "typeorm";
import * as Entities from "./entities";  // Asegúrate de importar todas las entidades correctamente
import { Flow } from "./entities/flow/flow.model";

dotenv.config();

export const dbConfig = {
  type: (process.env.DB_TYPE as DatabaseType) || "postgres",
  url: process.env.DB_URL || "sqlite:memory",
  entities: Object.values(Entities, Flow),
  synchronize: true, 
  subscribers: [],
  migrations: [],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const limit = 20;  // Límite de items devueltos por página
