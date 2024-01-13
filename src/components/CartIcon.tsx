'use client'

import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import { userCartStore } from "@/utils/store";
import { useEffect } from "react";

const CartIcon = () => {

  const {totalItems} = userCartStore()
  useEffect(()=>{
    userCartStore.persist.rehydrate()
  },[])
  return (
    <div>
         <Link href="/cart" className="flex items-center gap-2 relative">
        <BsCart4 className="relative w-8 h-8 md:w-5 md:h-5" />
        <span className="absolute -top-4 left-3 rounded-full text-sm text-orange-500">{totalItems}</span>
        </Link>
    </div>
  )
}

export default CartIcon