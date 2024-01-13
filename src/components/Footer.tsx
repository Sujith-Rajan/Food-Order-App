import React from 'react'
import Link from 'next/link'


const Footer = () => {
  return (
    <div className='h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-orange-500 flex items-center justify-between border-t-2 border-orange-500'>
      <Link href="/" className='font-bold text-xl uppercase'>Royal Bakers</Link>
      <p>© All Right Reserved</p>
    </div>
  )
}

export default Footer