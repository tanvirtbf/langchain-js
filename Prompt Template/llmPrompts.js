import dotenv from 'dotenv'
dotenv.config()

// LLMS - Prompt Template

import { OpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'

const llm = new OpenAI({})

