import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MountainSnow, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-emerald-50">
      {/* Swiss-inspired background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-300"></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-sky-300"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-teal-200"></div>
      </div>

      {/* Hero content */}
      <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
          <MountainSnow className="h-8 w-8 text-emerald-600" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800 mb-6">
          <span className="text-emerald-600">JBCT</span> Blockchain Creator
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10">
          Experience the simplicity and elegance of creating your own Ethereum
          private chain, with AI-powered tools and a clean, intuitive interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Link href="/login" className="flex items-center gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Link href="#">Learn More</Link>
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-4xl">
          {[
            {
              title: 'AI-Powered',
              description:
                'Intelligent assistance throughout the blockchain creation process',
            },
            {
              title: 'Multi-Chain Support',
              description: 'Create and manage multiple chains with ease',
            },
            {
              title: 'Elegant Dashboard',
              description:
                'Monitor and manage your blockchain with a clean, intuitive interface',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-medium text-emerald-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
