import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

export async function promptFileOrDirectory(currentPath) {
    const filesAndDirs = await readdir(currentPath);
    const choices = await Promise.all(filesAndDirs.map(async (item) => {
        const fullPath = path.resolve(currentPath, item);
        const stats = await stat(fullPath);
        return {
            name: stats.isDirectory() ? `${chalk.blue(item)}/` : item,
            value: fullPath,
            short: item,
        };
    }));

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
    const currentPath = process.cwd();

    while (true) {
        const selectedItem = await promptFileOrDirectory(currentPath);

        if ((await stat(selectedItem)).isDirectory()) {
            currentPath = selectedItem;
        } else {
            console.log(chalk.green(`You selected file: ${selectedItem}`));
            return selectedItem;
            break;
        }
    }
}
