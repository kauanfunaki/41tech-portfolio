import app from "./app";
import { logger } from "./lib/logger";
import { pool } from "@workspace/db";

async function runMigrations() {
  await pool.query(`
    ALTER TABLE projects
      ADD COLUMN IF NOT EXISTS short_description_en TEXT,
      ADD COLUMN IF NOT EXISTS full_description_en   TEXT,
      ADD COLUMN IF NOT EXISTS problem_en            TEXT,
      ADD COLUMN IF NOT EXISTS solution_en           TEXT,
      ADD COLUMN IF NOT EXISTS result_en             TEXT;
  `);
  logger.info("Migrations OK");
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

await runMigrations();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
