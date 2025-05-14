import { OpenAIStream, StreamingTextResponse } from 'ai'
import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  // Parse the chain configuration from the prompt
  let chainConfig
  try {
    chainConfig = JSON.parse(prompt)
  } catch (error) {
    chainConfig = { prompt }
  }

  // Generate a system message based on the chain configuration
  const systemMessage = `You are an AI assistant specialized in Ethereum private chain creation. 
  You are helping to create a private Ethereum blockchain with the following configuration:
  - Chain Name: ${chainConfig.name || 'Unknown'}
  - Consensus: ${chainConfig.consensus || 'Unknown'}
  - Chain ID: ${chainConfig.chainId || 'Unknown'}
  - Initial Accounts: ${chainConfig.accounts?.length || 0} accounts configured
  
  Provide technical details about the blockchain setup process and what the user can expect.`

  // Generate the completion using the AI SDK
  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    system: systemMessage,
    prompt:
      'Explain the technical details of this blockchain setup and what features are available.',
  })

  // Create a stream from the generated text
  const stream = OpenAIStream({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemMessage },
      {
        role: 'user',
        content:
          'Explain the technical details of this blockchain setup and what features are available.',
      },
      { role: 'assistant', content: text },
    ],
  })

  // Return the stream as a streaming response
  return new StreamingTextResponse(stream)
}
