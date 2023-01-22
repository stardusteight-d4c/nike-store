import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { hostServer } from '../../App'
import nikeLogo from '../../assets/logo.png'
import { useAppDispatch } from '../../store/hooks'
import { setConsumer } from '../../store/slices/ConsumerSlice'
import { confirmPassword } from '../../utils/confirmPassword'
import { isValidEmailAddress } from '../../utils/isValidEmailAddress'
import { isValidZipCode } from '../../utils/isValidZipCode'
import { Input } from './integrate/Input'

interface Props {
  setActiveLogin: React.Dispatch<React.SetStateAction<'sign-in' | 'sign-up'>>
}

export const SignUp = ({ setActiveLogin }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    const CEP = data.cep.toString()
    const EMAIL = data.emailAddress.toString()

    const zipCode: ViaCepApiResponse = await isValidZipCode(CEP)
    const validEmailAddres = isValidEmailAddress(EMAIL)
    const validPassword = confirmPassword(
      data.password.toString(),
      data.confirmPassword.toString()
    )

    delete data.confirmPassword

    if (zipCode && validEmailAddres && validPassword) {
      const address = {
        state: zipCode.uf,
        city: zipCode.localidade,
        neighborhood: zipCode.bairro,
        street: zipCode.logradouro,
        number: null,
        complement: null,
      }
      // 11724-110
      fetch(`${hostServer}/api/consumer/createConsumer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ consumer: data, address }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.error(data.message)
            setLoading(false)
          } else {
            localStorage.setItem('session', data.sessionToken)
            setLoading(false)
            dispatch(setConsumer(data.consumer))
            navigate('/')
          }
        })
        .catch((error) => console.log(error))
    }
  }

  const signUpInputProps = [
    {
      id: 'fullName',
      type: 'text',
      placeholder: 'Full name',
      styles: 'rounded-t-md',
    },
    {
      id: 'emailAddress',
      type: 'email',
      placeholder: 'Email address',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Password',
    },
    {
      id: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
    },
    {
      id: 'cep',
      type: 'text',
      placeholder: 'CEP (00000-000)',
      styles: 'rounded-b-md',
    },
  ]

  return (
    <div className={style.wrapper}>
      <div className={style.contentWrapper}>
        <div>
          <img className={style.logoImg} src={nikeLogo} alt="Nike Store" />
          <h2 className={style.title}>Create an account</h2>
          <p className={style.paragraph}>
            Or{' '}
            <a
              onClick={() => setActiveLogin('sign-in')}
              className={style.linkSignIn}
            >
              Sign in
            </a>
          </p>
        </div>
        <form
          autoComplete="false"
          className={style.formContainer}
          onSubmit={(e) => onSubmit(e)}
        >
          <div className={style.inputsWrapper}>
            {signUpInputProps.map((input) => (
              <Input {...input} />
            ))}
          </div>

          <div>
            <button type="submit" className={style.buttonSubmit}>
              {loading ? 'Loading... ' : 'Sign up'}
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
  linkSignIn: `font-medium text-blue-500 hover:text-indigo-600 cursor-pointer transition-all duration-200 hover:underline`,
  formContainer: `mt-8 space-y-6`,
  inputsWrapper: `-space-y-px rounded-md shadow-sm`,
  buttonSubmit: `group relative flex w-full justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
}
