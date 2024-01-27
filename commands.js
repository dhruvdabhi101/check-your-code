import chalk from 'chalk';
import { generateOptimizedCode } from './openai.js';
import fs from 'fs';
import { exec } from 'child_process';
import showDiff from './showDiff.js';

export async function executeOptimizations(file) {
    const codeToOptimize = readFileContent(file);
    try {
        var loader = showAnimation()
        const optimizedCode = await generateOptimizedCode(codeToOptimize);
        stopAnimation(loader)
        printOptimizedCode(optimizedCode, file);
    } catch (error) {
        console.error('Optimization failed:', error);
    }
}

export async function executeSecurityChecks() {
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

function printOptimizedCode(optimizedCode, file) {
    const lines = optimizedCode.split('\n');
    // color the lines with green if they start with digit
    let inCodeBlock = false;
    let code = ""
    lines.forEach(line => {
        if (line[0] >= '0' && line[0] <= '9') {
            console.log(chalk.greenBright(line));
        } else {
            if (line[0] === '`') {
                inCodeBlock = !inCodeBlock;
            } else {
                if (inCodeBlock) {
                    code += line
                    code += "\n"
                } else {
                    console.log(line);
                }
            }
        }
    })
    showDiff(file, code)
}


function showAnimation() {
    return (function () {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function () {
            process.stdout.write("\r" + P[x++]);
            x &= 3;
        }, 250);
    })();
}

function stopAnimation(loader) {
    setInterval(loader);
}