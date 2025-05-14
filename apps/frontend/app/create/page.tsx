'use client'

import { ChainForm } from '@/components/ChainForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export interface ChainConfig {
  name: string
  consensus: 'PoW' | 'PoA'
  chainId: number
  coinbase: string
  accounts: { address: string; balance: string }[]
}

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Swiss landscape background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
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
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-sky-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-slate-600 hover:text-slate-900 hover:bg-white/50"
          >
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 sm:p-8 border border-white/50">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M10,70 L30,40 L50,60 L70,20 L90,50"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="drop-shadow-md"
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
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Create Your Alpine Chain
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Configure your Ethereum private chain with Swiss precision and
              reliability. Each parameter is carefully validated to ensure
              optimal performance.
            </p>
          </div>

          <ChainForm
            onSubmit={(data) => {
              // Store the chain configuration in localStorage for the next page
              if (typeof window !== 'undefined') {
                localStorage.setItem('chainConfig', JSON.stringify(data))
                // Navigate to the creating page
                window.location.href = '/creating'
              }
            }}
            isSubmitting={false}
          />
        </div>

        {/* Swiss design inspiration note */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Inspired by the precision and elegance of Swiss design</p>
        </div>
      </div>
    </div>
  )
}
