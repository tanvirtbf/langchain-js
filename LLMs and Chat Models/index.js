import dotenv from 'dotenv'
dotenv.config()


// LLM 
import { OpenAI } from "@langchain/openai";
const llm = new OpenAI({
  model: "gpt-3.5-turbo-instruct",
});