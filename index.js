import chalk from "chalk";
import figlet from "figlet";
import createFrontend from "./createFrontend.js"

// console.log(chalk.magenta("Checking for ~/.checkyourcode folder"));

console.log(
  chalk.magentaBright(figlet.textSync(`Check Your Code`, { horizontalLayout: "default" })));

createFrontend();
