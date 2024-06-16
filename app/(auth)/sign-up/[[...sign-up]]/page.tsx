import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='flex h-[50%] w-full items-center justify-center'>
        <SignUp/>
    </main>
  )
}

export default SignInPage
