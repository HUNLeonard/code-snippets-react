import { Outlet } from 'react-router-dom'
import { UserHeader } from './UserHeader'
import { SignedIn } from '@clerk/clerk-react'

export const UserLayout = () => {
  return (
    <>
      <SignedIn>
        <UserHeader />
      </SignedIn>
      <Outlet />
    </>
  )
}
