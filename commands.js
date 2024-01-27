import chalk from 'chalk';
import { generateOptimizedCode } from './openai.js';
import fs from 'fs';

export async function executeOptimizations(file) {
    // Read the file content or obtain the code you want to optimize
    const codeToOptimize = readFileContent(file);

    try {
        const optimizedCode = await generateOptimizedCode(codeToOptimize);
        // console.log('Optimized Code:', optimizedCode);
        printOptimizedCode(optimizedCode);

        // Perform further actions with the optimized code
        // For example, write the optimized code back to the file or apply it in memory
    } catch (error) {
        console.error('Optimization failed:', error);
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
