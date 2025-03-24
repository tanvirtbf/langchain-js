import dotenv from 'dotenv'
dotenv.config()

// LLMS - Prompt Template

import { OpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'

const llm = new OpenAI({})


// Example 1 - Prompt having No Input Variable
// const noInputPrompt = new PromptTemplate({
//   inputVariables : [],
//   template: "Tell me a trick of Javascript"
// })
// const formattedNoInputPrompt = await noInputPrompt.format()
// console.log("No Input Prompt : ", formattedNoInputPrompt)

// const response = await llm.invoke(formattedNoInputPrompt)
// console.log("Response : ", response)

const noInputPrompt = new PromptTemplate({
  inputVariables: [],
  template : "Tell me a trick of Javascript"
})
const formattedMultiInputPrompt = await noInputPrompt.format()
// console.log(formattedMultiInputPrompt)

const response = await llm.invoke(formattedMultiInputPrompt)
console.log(response)





// // Example 2 - Prompt having One Input Variable
// const OneInputPrompt = new PromptTemplate({
//   inputVariables : ["language"],
//   template: "Tell me a trick of {language}"
// })
// const formattedOneInputPrompt = await OneInputPrompt.format({
//   language : "C++"
// })
// // console.log("No Input Prompt : ", formattedOneInputPrompt)

// const response = await llm.invoke(formattedOneInputPrompt)
// console.log("Response : ", response)





// // Example 3 - Prompt having Multiple Input Variable
// const MultiInputPrompt = new PromptTemplate({
//   inputVariables : ["language", "topic"],
//   template: "Tell me a trick of {language} , and topic is {topic}"
// })
// const formattedMultiInputPrompt = await MultiInputPrompt.format({
//   language : "Javascript",
//   topic: "Array"
// })
// // console.log("No Input Prompt : ", formattedMultiInputPrompt)

// const response = await llm.invoke(formattedMultiInputPrompt)
// console.log("Response : ", response)




// Example 4 - Prompt Template - No input variable manually
// const template = "Tell me a trick of {language} from {topic}"
// const promptTemplate = PromptTemplate.fromTemplate(template)
// // console.log('Prompt Template: ', promptTemplate.inputVariables)

// const formattedPromptTemplate = await promptTemplate.format({
//   language: "python",
//   topic: "function"
// })
// // console.log('Formatted Prompt Template : ', formattedPromptTemplate)

// const response = await llm.invoke(formattedPromptTemplate)
// console.log(response)