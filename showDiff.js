import { execSync, spawnSync } from 'child_process';
import fs from 'fs/promises';
import inquirer from 'inquirer';

export default async function showDiff(filePath, newData) {
    try {
        const tempFilePath = filePath + ".temp";
        await fs.writeFile(tempFilePath, newData, 'utf8');

        const diffOutput = spawnSync('git', ['diff', '--color', '--no-index', filePath, tempFilePath], {
            encoding: 'utf-8',
        }).stdout;

        console.log(diffOutput);

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Do you want to stage these changes?',
                choices: ['Stage', 'Do not stage'],
            },
        ]);

        if (answers.choice === 'Stage') {
            await fs.writeFile(filePath, newData, 'utf8');
            execSync(`git add ${filePath}`);

            console.log('Changes staged successfully.');
        } else {
            console.log('Changes not staged.');
        }

        await fs.unlink(tempFilePath);
    } catch (error) {
        console.error(error.message);
    }
}
