import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SignIn } from '../components/login/SignIn'
import { SignUp } from '../components/login/SignUp'

interface Props {}

export const Login = (props: Props) => {
  const [activeLogin, setActiveLogin] = useState<'sign-in' | 'sign-up'>(
    'sign-in'
  )

  return (
    <main className="flex items-center justify-center h-screen relative">
        <Link to="/" className="text-slate-900 absolute top-5 left-[18px]">
          <span className='flex items-center gap-x-2'>
            <ArrowLongLeftIcon className="w-8 h-8 text-2xl" />
            Back to the Store
          </span>
        </Link>
        {activeLogin === 'sign-in' ? (
          <SignIn setActiveLogin={setActiveLogin} />
        ) : (
          <SignUp setActiveLogin={setActiveLogin} />
        )}
    </main>
  )
}
