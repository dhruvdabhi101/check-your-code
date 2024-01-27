import { generateOptimizedCode } from './openai.js';
import fs from 'fs';

export async function executeOptimizations(file) {
  console.log(`Optimizing ${file}...`);

  // Read the file content or obtain the code you want to optimize
  const codeToOptimize = readFileContent(file);

  try {
    const optimizedCode = await generateOptimizedCode(codeToOptimize);
    console.log('Optimized Code:', optimizedCode);

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

