"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { slider } from '@/utils/data'

const Slider = () => {
  const [currentSlide , setCurrentSlide] = useState(0)
  useEffect (()=> {
    const interval = setInterval(
      
      ()=> setCurrentSlide((prev) => (prev === slider.length - 1 ? 0 : prev + 1)),4000
    )
    return () => clearInterval(interval)
  },[])

  return (
    <div className='h-[calc(100vh-6rem)] flex flex-col md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50  '>
       
       <div className='flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold'>
          <h1 className='text-2xl text-center uppercase p-4 md:p-10 md:text-4xl'>{slider[currentSlide].title}</h1>
          <button className='bg-red-500 text-white py-4 px-8 mb-2'>Order Now</button>
       </div>
       <div className='flex-1 w-full relative transition-all duration-300 '>
        <Image 
         src={slider[currentSlide].image} alt='slider images' 
         fill sizes="100vw" className='object-cover'></Image>
       </div>
    </div>
  )
}

export default Slider