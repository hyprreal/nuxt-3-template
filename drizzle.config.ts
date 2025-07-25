import { defineConfig } from 'drizzle-kit'
import env from './lib/env'

export default defineConfig({
  dialect: 'postgresql',
  schema: [
    './db/schema/**/*.ts',
    '!./db/schema/**/index.ts',
  ],
  out: './db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
