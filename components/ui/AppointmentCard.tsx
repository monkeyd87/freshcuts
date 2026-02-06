import React from 'react'

export const AppointmentCard = ({}) => {
  return (
    <div className="flex flex-row flex-1 gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-900">
       <img src="https://assets.aceternity.com/manu.png" className="h-7 w-7 shrink-0 rounded-full" width={50} height={50} alt="Avatar" />
       <div className="flex flex-col">
         <h2 className="text-2xl font-semibold">Your next appointment</h2>
         <h2 className="text-lg opacity-50">Membership</h2>
       </div>
    </div>
  )
}
