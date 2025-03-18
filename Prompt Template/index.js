import dotenv from 'dotenv'
dotenv.config()


// LLM 
// import { OpenAI } from "@langchain/openai";
// const llm = new OpenAI({
//   model: "gpt-3.5-turbo-instruct",
// });

// const response = await llm.invoke("who is prime minister of bangladesh?")
// console.log("Response : ", response)


// Chat Model 
import { ChatOpenAI } from "@langchain/openai";
import {HumanMessage, SystemMessage} from "@langchain/core/messages"
const chat = new ChatOpenAI({});

// Example 1 : 

// const response = await chat.invoke('who is prime minister of banglades?')
// console.log("Response : ",response)

// Example 2 : 
const message = [
  new SystemMessage("You are a joker"),
  new HumanMessage("Please create e joke for developer!")
]
const response = await chat.invoke(message)
console.log('Response : ', response)
