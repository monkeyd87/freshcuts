import React from 'react'

export const BarberCard = ({barberName,rating,imgUrl,description}: {barberName: string, rating: number, imgUrl?: string, description?: string }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-900">
      <img src={imgUrl} className="h-7 w-7 shrink-0 rounded-full" width={50} height={50} alt="Avatar" />
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">{barberName}</h2>
        <h2 className="text-lg opacity-50">Rating: {rating}</h2>
        <p className="text-sm opacity-50">{description}</p>
      </div>
    </div>
  )
}
