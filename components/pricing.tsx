import React from 'react'
import { PricingCard,PricingBenefit} from './ui/PricingCard'


export const Pricing = () => {
  return (
   <section className='bg-[#1E2952]'>
    <h1 className='text-3xl text-center'>Simple pricing for clients</h1>
    <div className='flex justify-center align-bottom p-4 items-center gap-20 mt-20' >
       <PricingCard 
       tierLabel='Pay as you go!!'
       planName='Standard'
       buttonText='Get Started'
       benefits={[{text:'Standard booking fees',included:true},{text:'AI preview basic (1 style)',included:true},{text:'48 cancellation policy',included:true}]}
       />
       <PricingCard 
       tierLabel='Membership'
       planName=''
       buttonText='Subscribe now!!'
       priceSuffix='/mo'
       price='$50'
       benefits={[{text:'0 booking fees',included:true},{text:'Prioriy booking',included:true},{text:' Unlimited AI preview',included:true},{text:'48 cancellation policy',included:true}]}
       mostPopular={true}
       accent='blue'
       />
    </div>
   </section>
  )
}
