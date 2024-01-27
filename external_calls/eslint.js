const { execSync } = require('child_process');

function runEslint(filePath) {
  try {
    const command = `npx eslint --rules 'sourceType: ["off"]' --env browser --env node --env es2021 --parser-options '{"ecmaVersion": 2021, "ecmaFeatures": {"jsx": true}, "sourceType": "module"}' ${filePath}`;
    const output = execSync(command, { encoding: 'utf-8' });

    return output;
  } catch (error) {
    console.error('ESLint command failed:', error.message);
    return null;
  }
}
