import inquirer from "inquirer";
import chalk from "chalk";
import { executeOptimizations, executeSecurityChecks } from "./commands.js";

export default async function createFrontend() {
    const questions = [
        {
            message: chalk.blue("Which framework do you want to use?"),
            name: "Action",
            type: "list",
            choices: ["Optimize", "Error Check", "Security Check"],
        },
    ];

    const results = await inquirer.prompt(questions);


    switch (results.Action) {
        case "Optimize":
            console.log(`Optimizing file ${chalk.cyan(filename)}...`);
            const answer = await inquirer.prompt({ message: "Enter filename: ", name: "filename" })
            const filename = answer.filename;
            executeOptimizations(filename);
            break;
        case "Security Check":
            await executeSecurityChecks();
            break;
        default:
            console.log("Error");
            break;
    }


}
