import fs from 'fs';
import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();
console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
async function readFileAndAskQuestion(filePath, question) {
  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Split the file content into smaller chunks (e.g., 3000 characters each)
    const chunkSize = 3000; // You can adjust this based on your file size
    const chunks = [];
    
    for (let i = 0; i < fileContent.length; i += chunkSize) {
      chunks.push(fileContent.slice(i, i + chunkSize));
    }

    // Use the chunked content in the system message
    for (let i = 0; i < chunks.length; i++) {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant. Here's a part of the file: \n${chunks[i]}`
          },
          {
            role: "user",
            content: question,
          }
        ],
        temperature: 0.7, 
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });

      console.log("Response content:", response.choices[0].message.content);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage
readFileAndAskQuestion('../AmanChaudharyResume.pdf', "Can you summarize this file?");
