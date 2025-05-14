'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuthStore } from '@/stores/authStore'
export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const authStore = useAuthStore()

  const handleLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate authentication
    switch (provider) {
      case 'google':
        // Navigate to create page
        authStore.loginWithGoogle()
        break
      case 'github':
        // Navigate to create page
        authStore.loginWithGithub()
        router.push('/create')
        break
      default:
        break
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-emerald-50 p-4 relative overflow-hidden">
      {/* Swiss landscape background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Swiss mountains"
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-emerald-50 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-sky-50 to-transparent"></div>
      </div>

      {/* Swiss-inspired background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-100 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-100 rounded-tr-full opacity=50"></div>

      <Card className="w-full max-w-md h-[360px] shadow-xl border-0 bg-white/95 backdrop-blur-sm relative z-10 rounded-2xl">
        <CardHeader className="space-y-2 text-center pt-12 pb-6">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Welcome to JBCT
          </CardTitle>
          <CardDescription className="text-slate-600 text-base">
            Sign in to create your private blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 py-4">
          <Button
            variant="outline"
            className="w-full h-12 border-slate-200 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center gap-3 text-base"
            onClick={() => handleLogin('google')}
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className="h-6 w-6"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full h-12 border-slate-200 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center gap-3 text-base"
            onClick={() => handleLogin('github')}
            disabled={isLoading}
          >
            <Github className="h-6 w-6" />
            Continue with GitHub
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center py-6">
          <p className="text-sm text-slate-500">
            By continuing, you agree to our Terms of Service
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
