import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent() {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Explain how AI works";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function
generateContent();