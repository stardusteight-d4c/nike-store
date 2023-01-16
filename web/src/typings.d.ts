interface HeroApi {
  title: string
  subtitle: string
  img: string
  btntext: string
  videos: { imgsrc: string; clip: string }[]
  sociallinks: { icon: string }[]
}

interface Sale {
  title: string
  items: ItemSale[]
}

interface ItemSale {
  id: string
  title: string
  text: string
  rating: string
  btn: string
  img: any
  price: string
  stock: number
  color: string
  shadow: string
}

interface MainSection {
  heading: string
  title: string
  text: string
  btn: string
  url: string
  img: string
}

interface Story {
  title: string
  news: {
    title: string
    text: string
    img: string
    url: string
    like: string
    time: string
    by: string
    btn: string
  }[]
}

interface Footer {
  titles: { title: string }[]
  links: { link: string }[][]
}

interface CartItem {
  cartQuantity: number
  color: string
  id: string
  img: string
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
