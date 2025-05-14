import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/authService'

interface User {
  id: string
  name: string
  email: string
  image: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  error: string | null
  loginWithGoogle: () => Promise<void>
  loginWithGithub: () => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        try {
          await authService.googleLogin()
        } catch (error) {
          set({ error: 'Google login failed' })
        } finally {
          set({ isLoading: false })
        }
      },
      loginWithGithub: async () => {
        set({ isLoading: true, error: null })
        try {
          await authService.githubLogin()
        } catch (error) {
          set({ error: 'GitHub login failed' })
        } finally {
          set({ isLoading: false })
        }
      },
      logout: () => {
        set({ user: null })
      },
      fetchUser: async () => {
        set({ isLoading: true })
        try {
          const user = await authService.getCurrentUser()
          set({ user })
        } catch (error) {
          set({ user: null })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    },
  ),
)
