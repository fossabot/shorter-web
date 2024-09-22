'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Perform any logout logic here
    router.push('/logout')
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Logout
    </Button>
  )
}