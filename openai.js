import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs"
dotenv.config();

export async function generateOptimizedCode(code) {

    const openaiKey = fs.readFileSync(`${process.env.HOME}/.checkyourcode`, "utf8").split("=")[1].trim();
    const openai = new OpenAI({ apiKey: openaiKey });
    try {
        const completion = await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: getContent(code) }],
                max_tokens: 1000,
                temperature: 0.9,
            }
        )

        const optimizedCode = completion.choices[0].message.content.trim();
        return optimizedCode;
    } catch (error) {
        console.error('Error generating optimized code:', error);
        throw error;
    }
}


function getContent(code) {
    return `
    Act like you are a very experienced software developer and you have deep fundamental knowledge . I have a code file. So give the necessary optimizations that can be done in the code. You should optimize the code as a production ready which considers memory space, time complexity, performance, length of code etc. Give the optimisations points/description followed by the optimized code\n.
    ${code}`

}
