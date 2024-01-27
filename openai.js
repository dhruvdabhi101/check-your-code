import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log("API KEY = " + process.env.OPENAI_API_KEY);

export async function generateOptimizedCode(code) {
  try {
    const completion = await openai.chat.completions.create(
        {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Optimize the given code. I want to display this response in command line. So give the optimization description minimum as possible and give the optimised code only instaed of full code for each optimization point. Avoid the starting content and ending content. Just give the points for optimizations.\n"+ code }],
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
