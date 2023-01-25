import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { hostServer } from '../../App'
import nikeLogo from '../../assets/logo.png'
import { useAppDispatch } from '../../store/hooks'
import { setConsumer } from '../../store/slices/ConsumerSlice'
import { Input } from './integrate/Input'
import { RememberMeCheckbox } from './integrate/RememberMeCheckbox'

interface Props {
  setActiveLogin: React.Dispatch<React.SetStateAction<'sign-in' | 'sign-up'>>
}

export const SignIn = ({ setActiveLogin }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    fetch(`${hostServer}/api/consumer/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message)
        } else {
          localStorage.setItem('session', data.sessionToken)
          dispatch(setConsumer(data.consumer))
          navigate('/')
        }
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }

  const signInInputProps = [
    {
      id: 'emailAddress',
      type: 'email',
      placeholder: 'Email address',
      styles: 'rounded-t-md',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      styles: 'rounded-b-md',
    },
  ]

  return (
    <div className={style.wrapper}>
      <div className={style.contentWrapper}>
        <div>
          <img className={style.logoImg} src={nikeLogo} alt="Nike Store" />
          <h2 className={style.title}>Sign in to your account</h2>
          <p className={style.paragraph}>
            Or{' '}
            <a
              onClick={() => setActiveLogin('sign-up')}
              className={style.linkSignUp}
            >
              Sign up
            </a>
          </p>
        </div>
        <form onSubmit={onSubmit} className={style.formContainer}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className={style.inputsWrapper}>
            {signInInputProps.map((input) => (
              <Input key={input.id} {...input} />
            ))}
          </div>
          <RememberMeCheckbox />
          <div>
            <button type="submit" className={style.buttonSubmit}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const style = {
  wrapper: `flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8`,
  contentWrapper: `w-full max-w-md space-y-8`,
  logoImg: `mx-auto h-12 w-auto brightness-0`,
  title: `mt-6 text-center text-3xl font-bold tracking-tight text-gray-900`,
  paragraph: `mt-2 text-center text-sm text-gray-600`,
  linkSignUp: `font-medium text-blue-500 hover:text-indigo-600 cursor-pointer transition-all duration-200 hover:underline`,
  formContainer: `mt-8 space-y-6`,
  inputsWrapper: `-space-y-px rounded-md shadow-sm`,
  buttonSubmit: `group relative flex w-full justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
}
