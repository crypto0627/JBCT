'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Trash2, Plus, HelpCircle, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ChainConfig } from '@/app/create/page'

const accountSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Must be a valid Ethereum address starting with 0x',
  }),
  balance: z.string().regex(/^\d+(\.\d+)?$/, {
    message: 'Must be a valid number',
  }),
})

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Chain name must be at least 2 characters.',
  }),
  consensus: z.enum(['PoW', 'PoA'], {
    required_error: 'Please select a consensus mechanism.',
  }),
  chainId: z.coerce.number().int().positive({
    message: 'Chain ID must be a positive integer.',
  }),
  coinbase: z.string().regex(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Must be a valid Ethereum address starting with 0x',
  }),
  accounts: z.array(accountSchema).min(1, {
    message: 'At least one account is required.',
  }),
})

interface ChainFormProps {
  onSubmit: (data: ChainConfig) => void
  isSubmitting: boolean
}

export function ChainForm({ onSubmit, isSubmitting }: ChainFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'Alpine Chain',
      consensus: 'PoW',
      chainId: 1337,
      coinbase: '0x0000000000000000000000000000000000000000',
      accounts: [
        {
          address: '0x0000000000000000000000000000000000000000',
          balance: '1000',
        },
      ],
    },
  })

  const addAccount = () => {
    const currentAccounts = form.getValues('accounts')
    form.setValue('accounts', [
      ...currentAccounts,
      {
        address: '0x0000000000000000000000000000000000000000',
        balance: '1000',
      },
    ])
  }

  const removeAccount = (index: number) => {
    const currentAccounts = form.getValues('accounts')
    if (currentAccounts.length > 1) {
      form.setValue(
        'accounts',
        currentAccounts.filter((_, i) => i !== index),
      )
    }
  }

  const handleTemplateSelect = (
    template: 'basic' | 'testing' | 'development',
  ) => {
    if (template === 'basic') {
      form.reset({
        name: 'Alpine Basic Chain',
        consensus: 'PoW',
        chainId: 1337,
        coinbase: '0x0000000000000000000000000000000000000000',
        accounts: [
          {
            address: '0x0000000000000000000000000000000000000000',
            balance: '1000',
          },
        ],
      })
    } else if (template === 'testing') {
      form.reset({
        name: 'Alpine Test Network',
        consensus: 'PoA',
        chainId: 2337,
        coinbase: '0x0000000000000000000000000000000000000000',
        accounts: [
          {
            address: '0x0000000000000000000000000000000000000000',
            balance: '5000',
          },
          {
            address: '0x0000000000000000000000000000000000000001',
            balance: '5000',
          },
          {
            address: '0x0000000000000000000000000000000000000002',
            balance: '5000',
          },
        ],
      })
    } else if (template === 'development') {
      form.reset({
        name: 'Alpine Dev Chain',
        consensus: 'PoW',
        chainId: 3337,
        coinbase: '0x0000000000000000000000000000000000000000',
        accounts: [
          {
            address: '0x0000000000000000000000000000000000000000',
            balance: '10000',
          },
          {
            address: '0x0000000000000000000000000000000000000001',
            balance: '10000',
          },
        ],
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Templates section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Start with a template
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: 'Basic Chain',
                value: 'basic',
                description: 'Simple single-node chain',
              },
              {
                name: 'Testing Network',
                value: 'testing',
                description: 'Multi-account PoA network',
              },
              {
                name: 'Development Chain',
                value: 'development',
                description: 'Developer-friendly setup',
              },
            ].map((template) => (
              <Card
                key={template.value}
                className="p-4 cursor-pointer hover:bg-emerald-50 transition-colors border-slate-200 hover:border-emerald-200"
                onClick={() => handleTemplateSelect(template.value as any)}
              >
                <h4 className="font-medium text-slate-800">{template.name}</h4>
                <p className="text-sm text-slate-600">{template.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Chain Name
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <p>
                              A descriptive name for your blockchain network.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Alpine Chain"
                        {...field}
                        className="border-slate-200 focus:border-emerald-300"
                      />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for your blockchain.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consensus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Consensus Mechanism
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <p>
                              PoW: Proof of Work - More decentralized but energy
                              intensive
                            </p>
                            <p>
                              PoA: Proof of Authority - More efficient but less
                              decentralized
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-slate-200 focus:border-emerald-300">
                          <SelectValue placeholder="Select consensus mechanism" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PoW">Proof of Work (PoW)</SelectItem>
                        <SelectItem value="PoA">
                          Proof of Authority (PoA)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The algorithm used to validate transactions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="chainId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Chain ID
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>
                              A unique identifier for your blockchain network.
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Common private values: 1337, 31337
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        className="border-slate-200 focus:border-emerald-300"
                      />
                    </FormControl>
                    <FormDescription>
                      A unique identifier for your blockchain network.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coinbase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Coinbase Address
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>The address that receives mining rewards.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0x..."
                        {...field}
                        className="border-slate-200 focus:border-emerald-300"
                      />
                    </FormControl>
                    <FormDescription>
                      The address that receives mining rewards.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="p-4 bg-sky-50 border border-sky-100 rounded-md">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sky-700">
                    Advanced Configuration
                  </h4>
                  <p className="text-sm text-sky-600">
                    These settings are for experienced users. The default values
                    work well for most use cases.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                <h4 className="font-medium text-slate-700 mb-2">Gas Limit</h4>
                <p className="text-sm text-slate-600">Default: 8000000</p>
                <p className="text-xs text-slate-500 mt-1">
                  The maximum amount of gas that can be used per block.
                </p>
              </div>

              <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                <h4 className="font-medium text-slate-700 mb-2">Block Time</h4>
                <p className="text-sm text-slate-600">Default: 2 seconds</p>
                <p className="text-xs text-slate-500 mt-1">
                  The target time between blocks (PoA only).
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-800">
              Initial Accounts
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAccount}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Account
            </Button>
          </div>

          <div className="space-y-4">
            {form.watch('accounts').map((_, index) => (
              <Card
                key={index}
                className="p-4 bg-slate-50 border-slate-200 hover:border-emerald-200 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`accounts.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm flex items-center gap-1">
                          Address
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>
                                  Ethereum address format: 0x followed by 40 hex
                                  characters
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0x..."
                            {...field}
                            className="border-slate-200 focus:border-emerald-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`accounts.${index}.balance`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm flex items-center gap-1">
                          Balance (ETH)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>Initial balance in ETH for this account</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="border-slate-200 focus:border-emerald-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAccount(index)}
                    disabled={form.watch('accounts').length <= 1}
                    className="text-slate-500 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove account</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <p className="text-sm text-slate-600">
              Your blockchain will be created with Swiss precision and
              reliability.
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white sm:min-w-32"
            >
              {isSubmitting ? 'Creating...' : 'Create Blockchain'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
