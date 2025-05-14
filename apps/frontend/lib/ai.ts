'use client'

import { useCompletion as useCompletionAI } from 'ai/react'

interface UseCompletionOptions {
  onFinish?: (completion: string) => void
  onError?: (error: Error) => void
}

export function useCompletion(options: UseCompletionOptions = {}) {
  const { onFinish, onError } = options

  const { completion, complete, error, isLoading, stop } = useCompletionAI({
    api: '/api/ai',
    onFinish,
    onError,
  })

  return {
    completion,
    complete,
    error,
    isLoading,
    stop,
  }
}
