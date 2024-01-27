import chalk from "chalk";
import figlet from "figlet";
import createFrontend from "./createFrontend.js"
import { executeOptimizations } from "./commands.js";

executeOptimizations("demo.js")

// console.log(
//   chalk.magentaBright(figlet.textSync(`Check Your Code`, { horizontalLayout: "default" })));
// 
// console.log(chalk.greenBright("What do you want to do ?"));
// 
// 
// createFrontend();
