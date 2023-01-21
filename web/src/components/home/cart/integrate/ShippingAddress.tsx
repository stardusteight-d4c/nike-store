import React, { useEffect, useState } from 'react'
import { hostServer } from '../../../../App'
import { useAppSelector } from '../../../../store/hooks'
import { selectCurrentConsumer } from '../../../../store/slices/ConsumerSlice'

interface Props {}

export const ShippingAddress = (props: Props) => {
  const currentConsumer: CurrentConsumer = useAppSelector(selectCurrentConsumer)
  const [address, setAddress] = useState<Address>()

  useEffect(() => {
    ;(async () => {
      await fetch(
        `${hostServer}/api/consumer/address?consumer_id=${currentConsumer.id}`,
        {
          method: 'GET',
          referrerPolicy: 'no-referrer',
        }
      )
        .then((res) => res.json())
        .then((data) => setAddress(data.address))
        .catch((error) => console.log(error))
    })()
  }, [currentConsumer])

  if (!address) {
    return <>Loading...</>
  }

  return (
    <div className="p-4 mb-14">
      <h1 className="text-2xl text-zinc-900">Confirm Shipping Address</h1>
      <div>
        <div className="flex flex-col items-start py-1">
          <label htmlFor="state" className="text-lg font-base">
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            defaultValue={address.state}
            className="px-2 py-1 border-2 border-zinc-900/50 bg-white/30 filter backdrop-blur-lg text-slate-800 outline-none rounded-md w-full focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start py-1">
          <label htmlFor="city" className="text-lg font-base">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={address.city}
            className="px-2 py-1 border-2 border-zinc-900/50 bg-white/30 filter backdrop-blur-lg text-slate-800 outline-none rounded-md w-full focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start py-1">
          <label htmlFor="neighborhood" className="text-lg font-base">
            Neighborhood
          </label>
          <input
            id="neighborhood"
            name="neighborhood"
            type="text"
            defaultValue={address.neighborhood}
            className="px-2 py-1 border-2 border-zinc-900/50 bg-white/30 filter backdrop-blur-lg text-slate-800 outline-none rounded-md w-full focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start py-1">
          <label htmlFor="street" className="text-lg font-base">
            Street
          </label>
          <input
            id="street"
            name="street"
            type="text"
            defaultValue={address.street}
            className="px-2 py-1 border-2 border-zinc-900/50 bg-white/30 filter backdrop-blur-lg text-slate-800 outline-none rounded-md w-full focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start py-1">
          <label htmlFor="number" className="text-lg font-base">
            Number
          </label>
          <input
            id="number"
            name="number"
            type="text"
            defaultValue={address.number}
            className="px-2 py-1 border-2 border-zinc-900/50 bg-white/30 filter backdrop-blur-lg text-slate-800 outline-none rounded-md w-full focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start py-1">
          <label htmlFor="complement" className="text-lg font-base">
            Complement
          </label>
          <input
            id="complement"
            name="complement"
            type="text"
            defaultValue={address?.complement!}
            className="px-2 py-1 border-2 border-zinc-900/50 bg-white/30 filter backdrop-blur-lg text-slate-800 outline-none rounded-md w-full focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  )
}
