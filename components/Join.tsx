
"use client"
import React from 'react'
import { LampContainer } from './ui/Lamp'
import {motion} from 'motion/react'
import { Card } from './ui/Card'

export const Join = () => {
  return (
    <section className=' flex 4w-full  justify-center items-center  relative  flex-col'>
      
            <motion.div 
             initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
            className='flex w-full items-center flex-col '>
                <div className='mt-10'>
                    <h1 className='text-5xl text-center'>Built for everyone.</h1>
                    <p>Whether you'er in the chair or behind it, our platform unifies the experience.</p>
                </div>
            </motion.div>

        <div className='flex gap-8   p-8 justify-center items-center'>
           <Card title='For client' discription='Get consistent cuts and save money with our subscription plans. Never worry about cash again.' benifits={["AI style consultant","cashless payments",'Subscriptions savings']}/>
           <Card title='For client' discription='Get consistent cuts and save money with our subscription plans. Never worry about cash again.' benifits={["AI style consultant","cashless payments",'Subscriptions savings']}/>
        </div>

    </section>
  )
}
