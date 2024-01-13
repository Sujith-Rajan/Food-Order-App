"use client"
import { link } from "@/utils/data"
import Link from 'next/link'
import { MdOutlinePhoneIphone } from "react-icons/md";
import Menu from "./Menu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserLinks from "./UserLinks";
import CartIcon from "./CartIcon";

const Navbar = () => {

  const {data,status}= useSession()
  return (
    <div className='h-12 bg-white p-4 flex items-center justify-between border-b-2 text-center text-orange-500 border-orange-500 uppercase md:h-24 lg:px-20 xl:px-40 ' >
       <div className="text-xl md:font-bold flex-1 max-md:font-bold max-md:text-center text-orange-500" >
        <Link href="/">Royal Bakers</Link>
      </div>
      <div className="hidden flex-1 md:flex gap-4">
      {link.map((item)=>(
      item.id !== 4 && (
      <div key={item.id} >
        <Link href={item.navigation || '/'}>{item.title}</Link>
      </div>
      )
      ))}
        </div>
     
      <div className="md:hidden">
        <Menu/>
      </div>
      <div className="hidden md:flex gap-3 items-center justify-end flex-1">
        <div className="flex items-center md:absolute top-3 r-2 lg:static gap-2 cursor-pointer bg-orange-500 md:text-orange-500 px-1 rounded-md text-sm">
        <MdOutlinePhoneIphone className=" text-white"/>
        <span className=" text-white">+91-3435889900</span>
        </div>
        <UserLinks/>
        <CartIcon/>
       
      
      </div>
      {status === "authenticated" &&
       <div className="ml-2 flex flex-col justify-center items-center">
       <Image src={data?.user?.image as string}  width={40} height={40} className='rounded-full hidden md:block' alt='user image'></Image>
       <p className="p-2 font-bold text-red-600 text-sm hidden md:block">{data?.user?.name}</p>
      
       </div>
      }
     
    </div>
  )
}

export default Navbar