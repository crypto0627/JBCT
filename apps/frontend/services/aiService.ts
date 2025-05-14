const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const aiService = {
  generateChainConfig: async (prompt: string) => {
    const response = await fetch(`${API_URL}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY || '',
      },
      body: JSON.stringify({ prompt }),
    })
    return response.json()
  },
}