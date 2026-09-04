import { runRelationalSeed } from './seedRelational.js';
import { connectDB, closeDB } from '../config/database.js';

async function main() {
  await connectDB();
  await runRelationalSeed();
  await closeDB();
  process.exit(0);
}

main().catch((err) => {
  console.error('[Seed Error]', err);
  process.exit(1);
});
