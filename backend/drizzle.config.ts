import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({ path: envFile });

export default defineConfig({
  schema: './src/**/*.schema.ts',

  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
