'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  RefreshCw,
  Server,
  Database,
  Activity,
  Wallet,
} from 'lucide-react'

interface ChainInfo {
  name: string
  consensus: string
  chainId: number
  blockHeight: number
  rpcUrl: string
  explorerUrl: string
  faucetUrl: string
  status: 'active' | 'inactive'
}

export default function DashboardPage() {
  const [chainInfo, setChainInfo] = useState<ChainInfo | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve chain configuration from localStorage
    if (typeof window !== 'undefined') {
      const storedConfig = localStorage.getItem('chainConfig')
      if (storedConfig) {
        const config = JSON.parse(storedConfig)

        // Create simulated chain info based on the configuration
        setChainInfo({
          name: config.name,
          consensus: config.consensus,
          chainId: config.chainId,
          blockHeight: Math.floor(Math.random() * 1000),
          rpcUrl: `https://rpc-${config.name.toLowerCase().replace(/\s+/g, '-')}.example.com`,
          explorerUrl: `https://explorer-${config.name.toLowerCase().replace(/\s+/g, '-')}.example.com`,
          faucetUrl: `https://faucet-${config.name.toLowerCase().replace(/\s+/g, '-')}.example.com`,
          status: 'active',
        })
      }
    }
  }, [])

  const copyToClipboard = (text: string, field: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text)
      setCopied(field)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  if (!chainInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-emerald-50">
        <p className="text-slate-600">Loading chain information...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 p-4 sm:p-6 md:p-8 relative overflow-hidden">
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

      {/* Swiss-inspired decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-sky-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-slate-600 hover:text-slate-900 hover:bg-white/50"
            >
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-white/80 text-emerald-700 border-emerald-200 px-3 py-1"
            >
              {chainInfo.status === 'active' ? (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  Inactive
                </span>
              )}
            </Badge>

            <Button
              variant="outline"
              size="sm"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Chain Overview Card */}
          <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                {chainInfo.name}
                <Badge className="ml-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                  {chainInfo.consensus}
                </Badge>
              </CardTitle>
              <CardDescription className="text-slate-500">
                Chain ID: {chainInfo.chainId} • Block Height:{' '}
                {chainInfo.blockHeight}
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="endpoints" className="w-full">
            <TabsList className="bg-white/70 backdrop-blur-sm w-full justify-start mb-6 p-1 rounded-lg">
              <TabsTrigger
                value="endpoints"
                className="data-[state=active]:bg-white"
              >
                Endpoints
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="data-[state=active]:bg-white"
              >
                Statistics
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-white"
              >
                Transactions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="endpoints" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* RPC URL Card */}
                <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-slate-800 flex items-center gap-2">
                      <Server className="h-5 w-5 text-emerald-600" />
                      RPC Endpoint
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Connect your wallet or applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-100">
                      <code className="text-sm text-slate-700 font-mono truncate">
                        {chainInfo.rpcUrl}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(chainInfo.rpcUrl, 'rpc')}
                        className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                      >
                        {copied === 'rpc' ? (
                          'Copied!'
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      Test Connection
                    </Button>
                  </CardFooter>
                </Card>

                {/* Explorer URL Card */}
                <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-slate-800 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-emerald-600" />
                      Block Explorer
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      View transactions and blocks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-100">
                      <code className="text-sm text-slate-700 font-mono truncate">
                        {chainInfo.explorerUrl}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(chainInfo.explorerUrl, 'explorer')
                        }
                        className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                      >
                        {copied === 'explorer' ? (
                          'Copied!'
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      asChild
                    >
                      <a
                        href={chainInfo.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Open Explorer <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Faucet URL Card */}
                <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-slate-800 flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-emerald-600" />
                      Faucet
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Get test tokens for your addresses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-100">
                      <code className="text-sm text-slate-700 font-mono truncate">
                        {chainInfo.faucetUrl}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(chainInfo.faucetUrl, 'faucet')
                        }
                        className="text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                      >
                        {copied === 'faucet' ? (
                          'Copied!'
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      asChild
                    >
                      <a
                        href={chainInfo.faucetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Request Tokens <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Database Info Card */}
                <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-slate-800 flex items-center gap-2">
                      <Database className="h-5 w-5 text-emerald-600" />
                      Chain Data
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                      Storage and persistence information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-sm text-slate-600">
                          Data Directory
                        </span>
                        <code className="text-xs text-slate-700 font-mono">
                          /data/{chainInfo.name.toLowerCase()}
                        </code>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-sm text-slate-600">
                          Storage Size
                        </span>
                        <span className="text-sm text-slate-700">
                          {(Math.random() * 100).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      Backup Data
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-0">
              <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-slate-800">
                    Network Statistics
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Real-time metrics for your private blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Block Height', value: chainInfo.blockHeight },
                      {
                        label: 'Transactions',
                        value: Math.floor(Math.random() * 500),
                      },
                      {
                        label: 'Nodes',
                        value: Math.floor(Math.random() * 5) + 1,
                      },
                      {
                        label: 'Gas Price',
                        value: `${Math.floor(Math.random() * 20)} Gwei`,
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 p-4 rounded-lg border border-slate-100"
                      >
                        <p className="text-sm text-slate-500 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-medium text-slate-800">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="mt-0">
              <Card className="border-0 shadow-sm bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-slate-800">
                    Transaction Simulator
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Create and send test transactions on your private chain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center py-8">
                    Transaction simulator will be available in the next update
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    disabled
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Create Transaction
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
