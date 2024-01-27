import { exec } from 'child_process';
import { generateOptimizedCode } from './openai.js';
import fs from 'fs';

export async function executeOptimizations(file) {
  console.log(`Showing Optimizations in ${file}...`);

  // Read the file content or obtain the code you want to optimize
  const codeToOptimize = readFileContent(file);

  try {
    // For Optimizations
    // const optimizedCode = await generateOptimizedCode(codeToOptimize);
    // console.log(optimizedCode);

    // For Security
    const snykCommand = 'snyk test';
    const op = exec(snykCommand, { encoding: 'utf-8' }, (error, stdout) => {
      if (error) {
        console.error('Unable to check security. Something went wrong');
        return;
      }
      console.log(stdout);
    });

    // Wait for the Snyk command to complete
    await new Promise((resolve) => {
      op.on('exit', (code) => {
        console.log(`Security check completed with code ${code}`);
        resolve();
      });
    });
  } catch (error) {
    console.error('Operation failed:', error);
  }
}

function readFileContent(file) {
    try {
        const codeContent = fs.readFileSync(file, 'utf-8');
        return codeContent;
    } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        throw error;
    }
}

