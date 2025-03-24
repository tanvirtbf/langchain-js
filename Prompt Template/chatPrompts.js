import dotenv from 'dotenv'
dotenv.config()

// Chat - Prompt Templat

import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate, PromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from '@langchain/core/prompts'
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'


const chat = new ChatOpenAI({})

// Example 1 - Message Prompt Template as Tuples
// const sys_template = "You are a helpful assistant that translates {input_language} to {output_language}."
// const human_template = "{text}"

// const chatPrompt = ChatPromptTemplate.fromMessages([
//   ["system", sys_template],
//   ["human", human_template]
// ])

// const formattedChatPrompt = await chatPrompt.formatMessages({
//   input_language: "English",
//   output_language: "french",
//   text: "I am learing Langchain JS from GeekyShows YT"
// })

// // console.log('Formatted Chat Prompt : ', formattedChatPrompt)

// const response = await chat.invoke(formattedChatPrompt)
// console.log(response.content)


// Example 2 - Using Message Classes
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate("You are a helpful assistant that translates {input_language} to {output_language}")


