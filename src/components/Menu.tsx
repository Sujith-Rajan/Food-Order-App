"use client";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { link } from "@/utils/data";
import Link from "next/link";
import { BsCart4 } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { userCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Menu = () => {
    const user = true
    const [open,setOpen] = useState(false)
    const{totalItems} = userCartStore()
    const{data} = useSession()
   
  return (
    <div onClick={() => setOpen(!open)}  className="text-orange border border-orange rounded-full p-1">
     
        {open ? <IoClose /> : <GiHamburgerMenu/>}
       {open && (
        <div className="bg-orange-400 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex
        flex-col gap-8 items-center justify-center text-2xl z-10 ">
          <div className="flex w-full ml-2 justify-between items-center">
            <div  className="flex">
            <Image src={data?.user?.image as string}  width={40} height={40} className='rounded-full'></Image>
           <p className="p-2 font-bold text-balck text-sm ">{data?.user?.name}</p>
            </div>
            <span className="text-sm align-content-end font-bold mr-2">Logout</span>
          </div>
          
            {link.map((item)=>(
                <Link href={item.navigation || '/'} key={item.id} onClick={() => setOpen(false)} >{item.title}</Link>
            ))}
            <Link href={user ? "/orders" : "/login"}>{user ? "Orders" : "Login"}</Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="flex gap-2">
            <BsCart4/><span>Cart({totalItems})</span>
            </Link>
            <div className="flex items-center md:absolute mb-2 cursor-pointer  ">
        <MdOutlinePhoneIphone />
        <span>+91 -343588990</span>
        </div>
        </div>
       )}
    </div>
  )
}

export default Menu