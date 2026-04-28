'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
   <Card><div className='flex flex-wrap flex-col p-9 m-7 rounded-2xl bg-red-100 w-3/5'>
      <h2 className='text-5xl font-bold text-center text-shadow-accent-foreground'>Oops!</h2>
      <p className='text-xl flex-wrap font-thin text-center text-shadow-accent-foreground text-red-400 p-5'>
        {error.message.includes("credential")?"Erreur de mot de passe ou utilisateur/email":error.message}
      </p>
      <Button className='flex'
      type='button'
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
      >
        Reéssayer encore
      </Button>
     
    </div>
    </Card>
  )
}