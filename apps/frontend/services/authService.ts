const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY || '',
}

export const authService = {
  googleLogin: async () => {
    window.location.href = `${API_URL}/auth/google`
  },
  githubLogin: async () => {
    const response = await fetch(`${API_URL}/auth/github`, {
      method: 'GET',
      credentials: 'include',
      headers,
    })
    return response.json()
  },
  async getCurrentUser() {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers,
      })

      if (!response.ok) {
        throw new Error('Unauthorized')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('getCurrentUser error:', error)
      throw error
    }
  },
  async handleGoogleCallback() {
    try {
      const user = await this.getCurrentUser()
      return user
    } catch (error) {
      console.error('Google callback error:', error)
      return null
    }
  },
}
