const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { runAPITests } = require('./api_verification.test.cjs');
const { runRBACTests } = require('./rbac_security.test.cjs');

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5000/api';

async function isServerAlive() {
  try {
    const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(1000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function waitForServer(timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isServerAlive()) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return false;
}

function stopProcess(proc) {
  if (!proc) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${proc.pid} /T /F 2>nul`);
    } else {
      proc.kill('SIGTERM');
    }
  } catch {
    // Process already exited
  }
}

async function main() {
  const startTime = Date.now();
  console.log('\n>>> STARTING PFIS PRODUCTION TEST & VERIFICATION SUITE <<<\n');

  let spawnedServer = null;
  const serverDir = path.resolve(__dirname, '..');

  try {
    const alreadyRunning = await isServerAlive();
    if (!alreadyRunning) {
      console.log('[Test Setup] Server is not running. Launching ephemeral test server...');

      const distServer = path.join(serverDir, 'dist', 'server.js');
      let cmd = 'node';
      let args = [distServer];

      if (!fs.existsSync(distServer)) {
        cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
        args = ['tsx', 'src/server.ts'];
      }

      spawnedServer = spawn(cmd, args, {
        cwd: serverDir,
        env: { ...process.env, NODE_ENV: 'test', PORT: '5000' },
        stdio: 'ignore',
        detached: false,
      });

      const isReady = await waitForServer(15000);
      if (!isReady) {
        throw new Error('Test server failed to start within 15 seconds.');
      }
      console.log('[Test Setup] Ephemeral test server ready on port 5000.\n');
    } else {
      console.log('[Test Setup] Active PFIS server detected on port 5000.\n');
    }

    await runAPITests();
    console.log('\n');
    await runRBACTests();

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n>>> ALL TESTS PASSED SUCCESSFULLY IN ${elapsed}s <<<\n`);

    if (spawnedServer) {
      stopProcess(spawnedServer);
      console.log('[Test Teardown] Ephemeral test server stopped.\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('\n>>> TEST RUNNER FAILED WITH ERROR: <<<', error);
    if (spawnedServer) {
      stopProcess(spawnedServer);
    }
    process.exit(1);
  }
}

main();

