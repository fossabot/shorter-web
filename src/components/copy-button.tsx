"use client"

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Check, Copy, X } from "lucide-react"

interface CopyButtonProps {
  textToCopy: string
  onCopySuccess?: () => void
  onCopyError?: () => void
}

export default function CopyButton({ textToCopy, onCopySuccess, onCopyError }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setStatus('success')
      onCopySuccess?.()
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setStatus('error')
      onCopyError?.()
    } finally {
      setTimeout(() => setStatus('idle'), 1000)
    }
  }, [textToCopy, onCopySuccess, onCopyError])

  const getButtonVariant = () => {
    switch (status) {
      case 'success':
        return 'outline'
      case 'error':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getButtonContent = () => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4" />
      case 'error':
        return <X className="h-4 w-4" />
      default:
        return (
          <>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </>
        )
    }
  }

  return (
    <Button
      onClick={copyToClipboard}
      variant={getButtonVariant()}
      className="transition-all duration-200"
      disabled={status !== 'idle'}
    >
      {getButtonContent()}
    </Button>
  )
}