import { Options } from "@splidejs/react-splide";

export const splideOptions: Options = {
  perPage: 4,
  perMove: 2,
  type: 'loop',
  rewind: true,
  arrows: false,
  keyboard: 'global',
  gap: '1rem',
  pagination: false,
  padding: '2rem',
  breakpoints: {
    1200: { perPage: 3 },
    991: { perPage: 2.3 },
    768: { perPage: 2 },
    500: { perPage: 1.3 },
    425: { perPage: 1 },
  },
}
