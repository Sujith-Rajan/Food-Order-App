"use client"

import React, { useEffect, useState } from 'react'

const CountDown = () => {

    let difference = +new Date(`02/27/2024`) - +new Date();
    const[delay,setDelay] = useState(difference)
    
    let d = Math.floor(difference / (60 * 60 * 24 * 1000))
    let h = Math.floor((difference / (60 * 60 * 1000)) % 24)
    let m = Math.floor((difference / 1000 / 60) % 60)
    let s = Math.floor((difference / 1000) % 60)

    useEffect(() => {
        const timer = setInterval(() => {
            setDelay(delay -1)
        },1000)
        if(delay === 0){
            clearInterval(timer)
        }

        return () => {
            clearInterval(timer)
        }
    })
  
  return (
    <div>
        <span className='text-yellow-400 text-5xl md:text-8xl'>
            { d}:{ h}:{ m}:{ s}
        </span>
    </div>
  )
}

export default CountDown