'use client'

import React from 'react'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { Compare } from './ui/Compare'
import {motion} from 'motion/react'
import { Spotlight } from './ui/spotlight'
export const HeroAI = () => {
  return (
    <section className='flex h-screen  flex-1 justify-center items-center bg-[#17111d]'>
        <Spotlight/>
        <div className=' lg:flex sm:hidden m-8'>
            <Compare firstImage='/before.png' secondImage='/after.png'/>
        </div>
        <motion.div className='flex flex-col w-[50%]' initial={{opacity:0,x:0}} whileInView={{opacity:1,x:10}} transition={{delay: 0.3,duration: 0.8,ease: "easeInOut",}}>
            
            <TextGenerateEffect words="Try it before you style it."/>
            <p>Upload a selfie and let our neural network suggest your next lo Experiment with fades, tapers, and colors instantly. No more guessing games.</p>
        </motion.div>
    </section>
  )
}
