import { useState } from 'react'

export const useLeadCapture = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitLead = async (data: {
    name: string
    email: string
    phone?: string
    message?: string
    source?: string
  }) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (response.ok) {
        return { success: true }
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      return { success: false, error: 'Failed to submit lead' }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitLead, isSubmitting }
}