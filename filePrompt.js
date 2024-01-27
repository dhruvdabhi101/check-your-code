import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function promptFileOrDirectory(currentPath) {
    const filesAndDirs = fs.readdirSync(currentPath);
    const choices = filesAndDirs.map(item => {
        const fullPath = path.join(currentPath, item);
        return {
            name: fs.statSync(fullPath).isDirectory() ? chalk.blue(item) + '/' : item,
            value: fullPath,
            short: item,
        };
    });

    const questions = [
        {
            message: chalk.blue("Choose a file or directory:"),
            name: "selectedItem",
            type: "list",
            choices: choices,
        },
    ];

    const answers = await inquirer.prompt(questions);
    return answers.selectedItem;
}

export async function filePrompt() {
    let currentPath = process.cwd();

    while (true) {
        const selectedItem = await promptFileOrDirectory(currentPath);

        if (fs.statSync(selectedItem).isDirectory()) {
            currentPath = selectedItem;
        } else {
            console.log(chalk.green(`You selected file: ${selectedItem}`));
            return selectedItem;
            break;
        }
    }
}