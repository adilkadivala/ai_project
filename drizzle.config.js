import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config({ path: "./.env" }); 

// export default {
//   schema: "./utils/schema.ts",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.DATABASE_URL,
//     // url: "postgresql://neondb_owner:7sXFWwY5jEGi@ep-fancy-leaf-a5q8lwoq.us-east-2.aws.neon.tech/neondb?sslmode=require",
//   },
// };

export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
});