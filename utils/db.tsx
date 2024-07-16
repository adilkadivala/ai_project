import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.NETX_PUBLIC_DRIZZLE_DB_URL!);
export const db = drizzle(sql);
