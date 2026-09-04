const { runAPITests } = require('./api_verification.test.cjs');
const { runRBACTests } = require('./rbac_security.test.cjs');

async function main() {
  const startTime = Date.now();
  console.log('\n>>> STARTING PFIS PRODUCTION TEST & VERIFICATION SUITE <<<\n');

  try {
    await runAPITests();
    console.log('\n');
    await runRBACTests();

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n>>> ALL TESTS PASSED SUCCESSFULLY IN ${elapsed}s <<<\n`);
    process.exit(0);
  } catch (error) {
    console.error('\n>>> TEST RUNNER FAILED WITH ERROR: <<<', error);
    process.exit(1);
  }
}

main();
