import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/schema.ts',
	out: './migrations',
	dialect: 'postgres',

	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
