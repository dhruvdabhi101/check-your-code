import chalk from 'chalk';
import { generateOptimizedCode } from './openai.js';
import fs from 'fs';
import { exec } from 'child_process';

export async function executeOptimizations(file) {
    const codeToOptimize = readFileContent(file);

    try {
        const optimizedCode = await generateOptimizedCode(codeToOptimize);
        printOptimizedCode(optimizedCode);
    } catch (error) {
        console.error('Optimization failed:', error);
    }
}

export async function executeSecurityChecks(){
  console.log(`Checking for security issues...`);
  try {
    const snykCommand = 'snyk test';
    const op = exec(snykCommand, { encoding: 'utf-8' }, (error, stdout) => {
      if (error) {
        console.error('Unable to check security. Something went wrong');
        return;
      }
      console.log(stdout);
    });

    await new Promise((resolve) => {
      op.on('exit', (code) => {
        console.log(`Security check completed with code ${code}`);
        resolve();
      });
    });
  } catch (error) {
    console.error('Security check failed:', error);
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

function printOptimizedCode(optimizedCode) {
    // check for lines that start with digits 

    const lines = optimizedCode.split('\n');
    // color the lines with green if they start with digit
    let inCodeBlock = false;
    lines.forEach(line => {
        if (line[0] >= '0' && line[0] <= '9') {
            console.log(chalk.greenBright(line));
        } else {
            if (line[0] === '`') {
                inCodeBlock = !inCodeBlock;
            } else {
                if (inCodeBlock) {
                    console.log(chalk.blueBright(line));
                } else {
                    console.log(line);
                }
            }
        }
    })
}

