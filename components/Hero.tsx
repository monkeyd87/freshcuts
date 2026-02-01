import React from 'react'
import {BackgroundRippleEffect} from "@/components/ui/background-ripple-effect"
import { TextGenerateEffect } from './ui/text-generate-effect'
import { DirectionAwareHover } from './ui/direction-aware-hover'
import { MagicButton } from './ui/MagicButton'

export const Hero = () => {
  return (
    <div className=' flex   min-h-screen  items-center px-8'>
       <BackgroundRippleEffect rows={15}/>
       <div className='flex sm:flex-col md:flex-col lg:flex-row gap-8 flex-col z-10 '>
            <div className='flex  flex-1 flex-col justify-center '>
                <TextGenerateEffect words='You Perfect Cut, Every time'/>
                <p className='mt-8px '>The first booking platform with Al style previews. See your new look before you sit in the chair with our hyper-realistic generation engine.</p>
                <div className='button-container flex justify-start gap-8 py-8 '>
                    <MagicButton title='Book Cut'/>
                    <MagicButton title='Join us'/>
                </div>
            </div>
            <div className='flex-1'>   
                <div className='lg:flex  sm:hidden justify-end px-36'>
                    <DirectionAwareHover imageUrl='/taperfade.png'>
                        <p>hair cut</p>
                    </DirectionAwareHover>
                </div>
            </div>
       </div>
    </div>
  )
}
