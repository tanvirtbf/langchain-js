import dotenv from 'dotenv'
dotenv.config()

// LLMS - Prompt Template

import { OpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'

const llm = new OpenAI({})


// // Example 1 - Prompt having No Input Variable
// const noInputPrompt = new PromptTemplate({
//   inputVariables : [],
//   template: "Tell me a trick of Javascript"
// })
// const formattedNoInputPrompt = await noInputPrompt.format()
// // console.log("No Input Prompt : ", formattedNoInputPrompt)

// const response = await llm.invoke(formattedNoInputPrompt)
// console.log("Response : ", response)

// Example 2 - Prompt having One Input Variable
const OneInputPrompt = new PromptTemplate({
  inputVariables : ["language"],
  template: "Tell me a trick of {language}"
})
const formattedOneInputPrompt = await OneInputPrompt.format({
  language : "C++"
})
// console.log("No Input Prompt : ", formattedOneInputPrompt)

const response = await llm.invoke(formattedOneInputPrompt)
console.log("Response : ", response)