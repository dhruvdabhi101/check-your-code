import chalk from "chalk";
import figlet from "figlet";
import createFrontend from "./createFrontend.js"
import fs from "fs";
import inquirer from "inquirer";

console.log(chalk.magenta("Checking for ~/.checkyourcode file"));
if (fs.existsSync(`${process.env.HOME}/.checkyourcode`)) {
    console.log(chalk.magenta("Found ~/.checkyourcode file"));
    const file = fs.readFileSync(`${process.env.HOME}/.checkyourcode`, "utf8");
    if (file.includes("OPENAI_API_KEY") && file.includes("=") && file.includes("sk-")) {
        console.log(chalk.magenta("Found OPENAI_API_KEY in ~/.checkyourcode file"));
    } else {
        console.log(chalk.red("OPENAI_API_KEY not found in ~/.checkyourcode file"));
        console.log(chalk.red("Please add OPENAI_API_KEY to ~/.checkyourcode file"));
        // get OPENAI_API_KEY from user and save it to ~/.checkyourcode file
        const api_key = await inquirer.prompt({ message: "Enter OPENAI_API_KEY", name: "OPENAI_API_KEY" });
        // save api key to .checkyourcode 
        fs.writeFileSync(`${process.env.HOME}/.checkyourcode`, `OPENAI_API_KEY=${api_key.OPENAI_API_KEY}`);
    }
} else {
    console.log(chalk.red("Could not find ~/.checkyourcode file"));
    console.log(chalk.green("Creating ~/.checkyourcode file for you"));
    // get OPENAI_API_KEY from user and save it to ~/.checkyourcode file
    const api_key = await inquirer.prompt({ message: "Enter OPENAI_API_KEY", name: "OPENAI_API_KEY" });
    // save api key to .checkyourcode 
    fs.writeFileSync(`${process.env.HOME}/.checkyourcode`, `OPENAI_API_KEY=${api_key.OPENAI_API_KEY}`);
}
console.log(
    chalk.magentaBright(figlet.textSync(`Check Your Code`, { horizontalLayout: "default" })));

createFrontend();
