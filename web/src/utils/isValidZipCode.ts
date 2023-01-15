import { toast } from 'react-hot-toast'

export const isValidZipCode = async (CEP: string) => {
  if (/^[0-9]{5}\-[0-9]{3}$/.test(CEP)) {
    const result = await fetch(`https://viacep.com.br/ws/${CEP}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          toast.error('Invalid zip code')
          return false
        } else {
          return data
        }
      })
      .catch((error) => console.log(error))
    return result
  } else {
    toast.error('Invalid zip code format')
    return false
  }
}
