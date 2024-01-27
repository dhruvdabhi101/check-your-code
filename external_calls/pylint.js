const { execSync } = require('child_process');

function pylintSetup() {
    try {
        const command = `pip install pylint`;
        const output = execSync(command, { encoding: 'utf-8' });
        return output;
    } catch (error) {
        console.error('pylint command failed:', error.message);
        return null;
    }
}

function runpylint(filePath) {
    try {

        const command = `pylint --errors-only ${filePath}`;
        const output = execSync(command, { encoding: 'utf-8' });

        return output;
    } catch (error) {
        console.error('pylint command failed:', error.message);
        return null;
    }
}
