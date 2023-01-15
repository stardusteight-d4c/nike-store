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
    <main className="flex items-center justify-center h-screen">
      <Link to='/'>Retornar</Link>
      {activeLogin === 'sign-in' ? (
        <SignIn setActiveLogin={setActiveLogin} />
      ) : (
        <SignUp setActiveLogin={setActiveLogin} />
      )}
    </main>
  )
}
