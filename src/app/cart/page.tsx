"use client"
import { userCartStore } from "@/utils/store"
import { useSession } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { LuDelete } from "react-icons/lu";

const Cart = () => {
  const {products,totalItems,totalPrice,removeFromCart} = userCartStore()
  const {data: session,status} = useSession()
  const router = useRouter()

  useEffect(()=>{
    userCartStore.persist.rehydrate()
  },[])

  const handleCheckout = async() => {
    if(!session){
      router.push("/login")
    }
    else{
      try{
        const res = await fetch("http://localhost:3000/api/orders",{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            price: totalPrice,
            products,
            status:"Not Paid!",
            userEmail:session.user.email,
          })
        })
        const data = await res.json()
        router.push(`/payment/${data.id}`)

      }
      catch(err){
        console.log(err)
      }
     
    }
    
  }

  return (
    <>
   {totalItems ? (
    <div className="h-[calc(100vh-6rem)] flex flex-col tex-red-500 md:h-[calc(100vh-9rem)] lg:flex-row ">
     
      <div className="p-4 flex flex-col h-1/2 justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
       {products.map((product) => (
          <div className="flex items-center mb-4 justify-between gap-3">
          <Image src={product.img as string} alt="cart image" width={100} height={100} ></Image>
          <div>
              <h1 className="ml-2 text-sm md:text-xl text-center text-red-500">{product.title}</h1>
             
              <span className="ml-2">Size:<span className="font-bold">{product.optionTitle}</span> </span>
            </div>
            <h1 className="ml-2 text-sm md:text-xl text-center text-red-500"> <span className="mr-2 font-bold">x</span>{product.quantity}</h1>
            <h2 className="font-bold text-xl  text-red-500">Rs.{product.price}</h2>
            <span 
            className="cursor-pointer ml-4 text-xl text-red-600 font-bold"
             title="remove" onClick={()=> removeFromCart(product)}>
             <LuDelete />
              </span>
          </div>
      ))}
     
        </div>
       
        <div className="flex flex-col p-4  h-1/2 justify-center bg-fuchsia-50 gap-4 lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
          <div className="flex justify-between  text-red-500">
            <span>Subtotal ({totalItems})</span>
            <span>Rs.{totalPrice}</span>
          </div>
          <div className="flex justify-between  text-red-500">
            <span>Service Cost</span>
            <span>Rs.0</span>
          </div>
          <div className="flex justify-between  text-red-500">
            <span>Delivery Cost</span>
            <span className="text-green-500">FREE!</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">Rs.{totalPrice}</span>
          </div>
          <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckout}>Checkout
          </button>
        </div>
    
      </div>
   )
      :
        <div className="h-[calc(100vh-9rem)] md:h-[calc(100vh-9rem)] flex justify-center items-center">
           <h1 className="text-4xl text-center text-gray-400">Your Cart Is Empty! Add New Items to Cart</h1>
        </div>
  }
  </>
   
  )
}

export default Cart