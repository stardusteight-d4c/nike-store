import { LockClosedIcon } from '@heroicons/react/24/outline'
import { hostServer } from '../../App'
import nikeLogo from '../../assets/logo.png'
import { isValidEmailAddress } from '../../utils/isValidEmailAddress'
import { isValidZipCode } from '../../utils/isValidZipCode'

interface Props {
  setActiveLogin: React.Dispatch<React.SetStateAction<'sign-in' | 'sign-up'>>
}

export const SignUp = ({ setActiveLogin }: Props) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    const CEP = data.cep.toString()
    const EMAIL = data.emailAddress.toString()

    const zipCode: ViaCepApiResponse = await isValidZipCode(CEP)
    const validEmailAddres = isValidEmailAddress(EMAIL)

    if (zipCode && validEmailAddres) {
      const address = {
        state: zipCode.uf,
        city: zipCode.localidade,
        neighborhood: zipCode.bairro,
        street: zipCode.logradouro,
        number: null,
        complement: null,
      }

      fetch(`${hostServer}/api/createConsumer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ consumer: data, address }),
      }).catch((error) => console.log(error))
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto brightness-0"
            src={nikeLogo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              onClick={() => setActiveLogin('sign-in')}
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer transition-all duration-200 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
        <form
          autoComplete="false"
          className="mt-8 space-y-6"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="emailAddress" className="sr-only">
                Email address
              </label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
            <div>
              <label htmlFor="cep" className="sr-only">
                CEP
              </label>
              <input
                id="cep"
                name="cep"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="CEP (00000-000)"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
