'use client'

import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function CreatingPage() {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState('Initializing')
  const [chainConfig, setChainConfig] = useState<any>(null)

  useEffect(() => {
    // Retrieve chain configuration from localStorage
    if (typeof window !== 'undefined') {
      const storedConfig = localStorage.getItem('chainConfig')
      if (storedConfig) {
        const config = JSON.parse(storedConfig)
        setChainConfig(config)
      }
    }
  }, [])

  useEffect(() => {
    // Simulate progress steps
    const steps = [
      'Initializing blockchain environment',
      'Configuring consensus mechanism',
      'Setting up network parameters',
      'Creating genesis block',
      'Allocating initial accounts',
      'Starting network nodes',
      'Finalizing blockchain setup',
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setStep(steps[currentStep])
        setProgress(
          Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100)),
        )
        currentStep++
      } else {
        clearInterval(interval)
        // Navigate to dashboard when complete
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        }
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-emerald-50 p-4 relative overflow-hidden">
      {/* Swiss landscape background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-15">
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

      {/* Swiss-inspired decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-teal-100 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-100 opacity-40 blur-3xl"></div>

      <Card className="w-full max-w-lg shadow-lg border-0 bg-white/90 backdrop-blur-sm relative z-10">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6 py-8">
            {/* Alpine-inspired animation */}
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M10,70 L30,40 L50,60 L70,20 L90,50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                    className="opacity-50"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full"></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Creating Your Alpine Chain
            </h2>

            <p className="text-slate-600 max-w-md">{step}</p>

            <div className="w-full max-w-md space-y-2">
              <Progress value={progress} className="h-2 bg-slate-100" />
              <p className="text-sm text-slate-500 text-right">{progress}%</p>
            </div>

            {chainConfig && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-700 w-full">
                <p className="font-medium text-slate-700 mb-2">
                  Chain Configuration:
                </p>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <p className="text-slate-600">Name:</p>
                  <p className="font-medium">{chainConfig.name}</p>
                  <p className="text-slate-600">Consensus:</p>
                  <p className="font-medium">{chainConfig.consensus}</p>
                  <p className="text-slate-600">Chain ID:</p>
                  <p className="font-medium">{chainConfig.chainId}</p>
                  <p className="text-slate-600">Accounts:</p>
                  <p className="font-medium">
                    {chainConfig.accounts?.length || 0}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
