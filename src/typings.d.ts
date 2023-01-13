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
  img: string
  price: string
  color: string
  shadow: string
}
