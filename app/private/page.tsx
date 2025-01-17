'use client'

import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const Page = () => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/' // Redirects to home page after signing out
    })
  }

  return (
    <div className="p-4">
      <Button
        onClick={handleSignOut}
        variant="outline"
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Sign Out
      </Button>
    </div>
  )
}

export default Page