import hightlightimg from '../assets/hightlightimg.png'
import sneakershoe from '../assets/sneaker.png'

import facebook from '../assets/icons/facebook.svg'
import instagram from '../assets/icons/instagram.svg'
import twitter from '../assets/icons/twitter.svg'
import youtube from '../assets/icons/youtube.svg'
import messenger from '../assets/icons/messenger.svg'

import product1 from '../assets/products/product1.png'
import product2 from '../assets/products/product2.png'
import product3 from '../assets/products/product3.png'

const socialLinks = [
  { icon: facebook, link: '' },
  { icon: messenger, link: '' },
  { icon: instagram, link: '' },
  { icon: twitter, link: '' },
  { icon: youtube, link: '' },
]

const popularSales: Product[] = [
  {
    id: '0p0x1',
    title: 'AIR MAX PENNY 1',
    subtitle: "Anfernee “Penny” Hardaway's signature basketball shoe.",
    stock: 20,
    price: '1039,99',
    offer: '20% off',
    oldPrice: '1299,99',
    img: product1,
  },
  {
    id: '0p0x2',
    title: "Air Force 1 '07 Premium",
    subtitle:
      'Celebrating 40 years of pushing the boundaries of sport and fashion',
    stock: 10,
    price: '899,99',
    img: product2,
  },
  {
    id: '0p0x3',
    title: 'Air Force 1 Mid',
    subtitle:
      'Shadows crept under the "AIR" while ghoulish green accents added a Halloween touch      ',
    stock: 5,
    price: '1199,99',
    img: product3,
  },
]

const highlight = {
  heading: 'HIGHLIGHTS',
  title: 'NIKE AIR WITH LIMITLESS CHOICES',
  text: 'Our Purpose is to move the world forward. We take action by building community, protecting our planet and increasing access to sport.',
  btn: 'Explore More',
  url: 'https://www.nike.com/launch/t/nocta-hot-step-black-gold',
  img: hightlightimg,
}

const sneaker = {
  heading: 'FEATURED',
  title: 'NIKE SNEAKERS AIR LANCING SHOES',
  text: 'The radiance lives on Nike Sneakers Air Lancing Shoes, the basket ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.',
  btn: 'Explore More',
  url: 'https://sneakernews.com/2022/03/21/nike-lebron-2-retro-white-midnight-navy-varsity-crimson-dr0826-100/',
  img: sneakershoe,
}

const topRateSales: any = [
    {
      id: '0M0x1',
      title: 'Nike Air Low Premium',
      text: 'MEN Running Shoes',
      rating: '5+',
      btn: 'Buy Now',
      img: 'product7',
      price: '150',
      color: 'from-sky-600 to-indigo-600',
      shadow: 'shadow-lg shadow-blue-500',
    },
]


const story = {
  title: 'Top Stories',
  news: [
    {
      title: 'Jayson Tatum Debuts',
      text: 'Jordan Brands signature model for the past few years, Jayson Tatum will be dawning the Air Jordan 37 this season before attaining potentially his first signature sneaker with Jumpman, which he rumored to be in the works recently via his Twitter.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/air-jordan-37-low.jpg?w=540&h=380&crop=1',
      url: 'https://sneakernews.com/2022/09/14/air-jordan-37-low/',
      like: '3/5',
      time: '11 Mins',
      by: 'Jared Ebanks',
      btn: 'Read More',
    },
    {
      title: 'Bro’s Nike Zoom Freak 4',
      text: 'Arriving right time for the Fall, this upcoming take on the Zoom Freak 4 seemingly draws inspiration from Thanksgiving. Orange and brown, two staples of the holiday, are used throughout the upper, dressing the parts not bathed in shades of grey.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/nike-zoom-freak-4-ironstone-orange-trance-cobblestone-sail-dj6149-003-2.jpg?w=540&h=380&crop=1',
      time: '41 Mins',
      like: '5/5',
      url: 'https://sneakernews.com/2022/09/14/nike-zoom-freak-4-ironstone-orange-trance-cobblestone-sail-dj6149-003/',
      by: 'Michael Le',
      btn: 'Read More',
    },
    {
      title: 'Nike Air Max Plus',
      text: 'The Nike Air Max Plus has enjoyed the reveal of several colorways these last few of months. And as we officially embark on the Fall season, an additional set have been added to the calendar, including this newly-revealed grey and orange colorway.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/Nike-Air-Max-Plus-FB3358-001-2.jpg?w=540&h=380&crop=1',
      time: '2 Hours',
      url: 'https://sneakernews.com/2022/09/14/nike-air-max-plus-grey-orange-black-fb3358-001/',
      like: '5/5',
      by: 'Michael Le',
      btn: 'Read More',
    },
    {
      title: 'Air Jordan Retro High OG',
      text: 'Air Jordan Retro High OG popular series of AJ1s with the popular color-blocking with the original Yellow Toe flavor. The colorway was revealed back PE by musician Zach Myers, nearly four years later, Jordan fanatics will finally get their shot a GR release.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/03/yellow-toe-jordan-1-release-date-2.jpg',
      time: '7 Months',
      url: 'https://sneakernews.com/2022/03/09/air-jordan-1-retro-high-og-yellow-toe-555088-711/',
      like: '5/5',
      by: 'Sneaker News',
      btn: 'Read More',
    },
    {
      title: 'Nike Air Zoom GT Cut 2',
      text: 'The Bred coloryway of Zoom GT Cut 2 will be first to release this Friday, For Nike Members Nation World Wide while Sabrina Ionescus colorway is set for an October 13th release date. In the meantime, enjoy official images of both colorways below.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/nike-zoom-gt-cut-2-release-date.jpg?w=540&h=380&crop=1',
      time: '1 Months',
      url: 'https://sneakernews.com/2022/09/13/nike-zoom-gt-cut-2-officially-unveiled/',
      like: '3/5',
      by: 'Jared Ebanks',
      btn: 'Read More',
    },
    {
      title: 'Puma Announces Breanna',
      text: 'For the first time in over a decade, a signature basketball silhouette is being made for one of the WNBA’s best and brightest stars, Olympic Gold Medalist and Seattle Storm superstar Breanna Stewart. Puma Stewie 1 Quiet Fire will be available this Friday.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/puma-stewie-1-quiet-fire-breanna-stewart-release-date-lead.jpg?w=540&h=380&crop=1',
      time: '25 Days',
      url: 'https://sneakernews.com/2022/09/13/nike-zoom-gt-cut-2-officially-unveiled/',
      like: '3/5',
      by: 'Jared Ebanks',
      btn: 'Read More',
    },
    {
      title: 'Nike Air Force Orange Color',
      text: 'From lace toggles to city-inspired makeovers, the Nike Air Force 1 has delivered a number of unique modifications. Here though, the brand is taking things down quite a few notches, opting for a simple colorway helmed primarily by black and Laser Orange.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/Nike-Air-Force-1-Black-Yellow-FB7162-081-8.jpg?w=540&h=380&crop=1',
      url: 'https://sneakernews.com/2022/09/09/nike-air-force-1-black-laser-orange-fb7162-081/',
      time: '6 Days',
      like: '4/5',
      by: 'Micael Le',
      btn: 'Read More',
    },
    {
      title: 'Hello Kitty and Adidas',
      text: 'The world of Sanrio is vast and replete with many an iconic character. Few among the family, though, rival the immense influence of Hello Kitty, who’s played mascot for everything from Pringles merchandise to sneaker collaborations.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/hello-kitty-adidas-superstar-GW7168-2.jpg?w=540&h=380&crop=1',
      url: 'https://sneakernews.com/2022/09/08/hello-kitty-adidas-originals-gw7166-gw7167-gw7168/',
      time: '5 Days',
      like: '4/5',
      by: 'Micael Le',
      btn: 'Read More',
    },
    {
      title: 'Air Force 1 Low Expands',
      text: 'The nighttime aesthetic seen here is applied to the tumbled black leather panels of the upper and perforated mesh construction of the tongue while Royal trim and forefoot Swooshes provide additional intrigue to the darkened palette.',
      img: 'https://sneakernews.com/wp-content/uploads/2022/09/nike-air-force-1-low-worldwide-black-royal-fb1840-001-lead.jpg?w=540&h=380&crop=1',
      url: 'https://sneakernews.com/2022/09/08/nike-air-force-1-low-worldwide-black-royal-fb1840-001/',
      time: '5 Days',
      like: '4/5',
      by: 'Micael Le',
      btn: 'Read More',
    },
  ],
}

const footerData = {
  titles: [
    { title: 'About Nike' },
    { title: 'Get Help' },
    { title: 'Company' },
  ],
  links: [
    [
      { link: 'News' },
      { link: 'Careers' },
      { link: 'Investors' },
      { link: 'Prupose' },
      { link: 'Sustainability' },
    ],
    [
      { link: 'Order Status' },
      { link: 'Shipping & Delivery' },
      { link: 'Payment Options' },
      { link: 'Gift Card Balance' },
      { link: 'Contact Us' },
      { link: 'FAQ' },
      { link: 'Blog' },
    ],
    [
      { link: 'Gift Cards' },
      { link: 'Promotions' },
      { link: 'Find A Store' },
      { link: 'Signup' },
      { link: 'Nike Jouneral' },
      { link: 'Send Us Feeback' },
    ],
  ],
}

export {
  socialLinks,
  popularSales,
  footerData,
  story,
  sneaker,
  highlight,
  topRateSales,
}
