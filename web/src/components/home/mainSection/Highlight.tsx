import nikeGif from '../../../assets/highlight.gif'

interface Props {}

export const Highlight = (props: Props) => {
  return (
    <div className="flex-row my-24 flex items-center justify-between lg:flex-col lg:justify-center">
      <div className="flex items-center justify-center max-w-xl relative lg:max-w-none w-full">
        <img
          src={nikeGif}
          alt=""
          className="h-72 lg:h-64 md:h-60 sm:h-48 xsm:h-40 rotate-[-5deg] w-auto object-fill"
        />
      </div>
      <div className="max-w-lg lg:max-w-none w-full md:text-center grid items-center lg:justify-items-center">
        <h1 className="textGradient mb-2 tracking-wide text-lg sm:text-3xl">
          Build the Future with Non Fungible Tokens
        </h1>
        <h2 className="text-5xl leading-[55px] lg:text-4xl md:text-3xl sm:text-2xl font-bold text-zinc-900">
          RTFKT x Nike Dunk Genesis CRYPTOKICKS
        </h2>
        <p className="xl:text-sm text-lg font-light my-4 text-zinc-900">
          The collection was launched on NFT marketplace OpenSea, with the
          digital sneakers generating approximately 3,100 Ethereum ($8,720,000)
          in trade volume in just a few days.
        </p>
        <a
          href="https://opensea.io/collection/rtfkt-nike-cryptokicks"
          className="flex items-center"
          target="_blank"
          role="button"
        >
          <button
            type="button"
            className="buttonTheme !py-1.5 !rounded-full bg-zinc-900 text-slate-100"
          >
            See Collection
          </button>
        </a>
      </div>
    </div>
  )
}
