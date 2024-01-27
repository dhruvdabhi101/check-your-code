import inquirer from "inquirer";
import chalk from "chalk";
import { executeOptimizations} from "./commands.js";
import { filePrompt } from "./filePrompt.js";

export default async function createFrontend() {
    const questions = [
        {
            message: chalk.blue("Which framework do you want to use?"),
            name: "Action",
            type: "list",
            choices: ["Optimize", "Cancel"],
        },
    ];

    const results = await inquirer.prompt(questions);
    if(results.Action === "Cancel") {
        return;
    }

    const filename = await filePrompt();
    console.log(`Optimizing file ${chalk.cyan(filename)}...`);
    executeOptimizations(filename);

}
