"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Login = () => {

  const {data,status} = useSession()
 
  const router = useRouter()

  if(status === "loading"){
    return <p>Loading...</p>
  }
  if(status === "authenticated"){
    router.push("/")
  }

  return (
    <div className='p-4 h-[calc(100vh-10rem)] flex flex-col items-center justify-center  md:h-[calc(100vh-9rem)] '>
      <div className=' h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2'>
        <div className='relative h-1/3 w-full  md:h-full md:w-1/2'>
          <Image src="https://img.freepik.com/free-photo/french-fries-fried-chicken-wooden-plate_1203-7692.jpg?size=626&ext=jpg&ga=GA1.1.71836892.1694493931&semt=ais" fill alt='login auth image' className='object-cover'></Image>
        </div>
        <div className='flex  flex-col gap-8 p-10 md:w-1/2 '>
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p className='text-cyan-600 text-center'>Log into your account or create a new one using social buttons</p>
          <button className='flex gap-2 ring-1 ring-black justify-center p-3  rounded-md'onClick={()=> signIn("google")}>
          <Image src="/gglIcon.png" width={20} height={20} alt='login auth image'></Image>
          <span>Sign in with Google</span>
          </button>
          <button className='flex gap-2 ring-1 ring-black justify-center p-3 rounded-md'>
          <Image src="/fbIcon.png" width={20} height={20} alt='login auth image'></Image>
          <span>Sign in with Facebook</span>
          </button>
          <p className='text-sm'>
            Have a problem?
            <Link href="">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login