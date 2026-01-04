import React from 'react'
import { Card } from './ui/Card'

export const Pricing = () => {
  return (
   <section className='bg-[#1E2952]'>
    <h1 className='text-3xl text-center'>Simple pricing for clients</h1>
    <div className='flex justify-around'>
        <Card/>
        <Card/>
        <Card/>
    </div>
   </section>
  )
}
