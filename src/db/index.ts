// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";

// import * as schema from "./schema";

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

// client.connect();

// export const db = drizzle(client, { schema: schema });

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql, { schema: schema });
