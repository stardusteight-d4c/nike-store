import React, { useEffect, useState } from 'react'
import { hostServer } from '../../../../App'
import { useAppSelector } from '../../../../store/hooks'
import { selectCurrentConsumer } from '../../../../store/slices/ConsumerSlice'
import { ShippingAdressInput } from './ShippingAddressInput'

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

  const inputProps = [
    {
      id: 'state',
      labelName: 'State',
      defaultValue: address.state,
    },
    {
      id: 'city',
      labelName: 'city',
      defaultValue: address.city,
    },
    {
      id: 'neighborhood',
      labelName: 'Neighborhood',
      defaultValue: address.neighborhood,
    },
    {
      id: 'street',
      labelName: 'Street',
      defaultValue: address.street,
    },
    {
      id: 'number',
      labelName: 'Number',
      defaultValue: address.number,
    },
    {
      id: 'complement',
      labelName: 'Complement',
      defaultValue: address.complement,
    },
  ]

  return (
    <div className={style.wrapper}>
      <div className={style.contentContainer}>
        <h1 className={style.title}>Confirm Shipping Address</h1>
        <div>
          {inputProps.map((input) => (
            <ShippingAdressInput key={input.id} {...input} />
          ))}
        </div>
      </div>
    </div>
  )
}

const style = {
  wrapper: `scrollHiddenCSO scrollHideenIEF overflow-y-scroll h-[81vh] scroll-smooth`,
  contentContainer: `p-4 mb-14`,
  title: `text-2xl text-zinc-900`,
}
