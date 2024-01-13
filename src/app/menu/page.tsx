import React from 'react'
import Link from 'next/link'

import { MenuType } from '@/types/type'

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/catagories",{
    cache: "no-store"
  })
  if(!res){
    throw new Error("failed")
  }
  return res.json()
}

const MenuPage = async () => {
  const menu: MenuType =await getData()
  
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center gap-3 ">
      {menu.map((cat)=>(
        
        <Link key={cat.id}
        href={`/menu/${cat.slug}`} 
        className='w-full h-1/3 p-8 bg-cover md:h-1/2'
        style={{backgroundImage: `url(${cat.image})`}}
       >
       

        <div className={`text-${cat.color} w-full `}>
          <h1 className='uppercase font-bold text-3xl'>{cat.title}</h1>
          <p className="text-md my-8 font-bold">{cat.desc}</p>
          <button className={`hidden 2xl:block bg-${cat.color} text-${cat.color === "black" ? "white" : "red-500"} py-2 px-4 rounded-md`}>Explore</button>
        </div>
        </Link>
        ))}
    </div>
  )
}

export default MenuPage