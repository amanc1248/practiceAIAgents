import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Personal data to share with the AI agent
const personalData = {
  name: "Aman Chaudhary",
  location: "Kathmandu, Nepal",
  skills: ["ReactJS", "NodeJS", "MongoDB", "Python"],
  experience: "Software Engineer with 3+ years of experience.",
  hobbies: ["Reading", "Traveling", "Coding"],
  achievements: ["Completed Codecademy's Full Stack Career Path", "Built a book-selling e-commerce app"]
};

// Async function to query the model
async function askAgent(question) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant with the following data about the user: ${JSON.stringify(personalData)}`
        },
        {
          role: "user",
          content: question,
        }
      ],
      temperature: 0.7,  // Slightly less creative for factual responses
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    // Print the response content
    console.log("Response content:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Ask a question to the agent
askAgent("Can you tell what kind of jobs i can get?");
