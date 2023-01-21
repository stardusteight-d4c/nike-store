interface Sale {
  title: string
  items: ItemSale[]
}

interface Product {
  id: string
  title: string
  subtitle: string
  offer?: string
  oldPrice?: string
  img: any
  price: string
  stock: number
}

interface Story {
  title: string
  text: string
  img: string
  url: string
}

interface Footer {
  titles: { title: string }[]
  links: { link: string }[][]
}

interface CartItem {
  cartQuantity: number
  color: string
  id: string
  img: any
  price: string
  shadow: string
  text: string
  title: string
}

interface ViaCepApiResponse {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
}

interface SignUpFormData {
  fullName: string
  emailAddress: string
  password: string
  confirmPassword: string
  cep: string
}

interface CurrentConsumer {
  id: string
  name: string
  email: string
  cep: string
}

interface Address {
  city: string
  complement: string | null
  consumerId: string
  id: string
  neighborhood: string
  number: number
  state: string
  street: string
}
