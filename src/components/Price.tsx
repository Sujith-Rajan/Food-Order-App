'use client'
import { ProductType } from '@/types/type';
import { userCartStore } from '@/utils/store';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


const Price = ({product}: {product: ProductType}) => {
    const [quantity,setQuantiy] = useState(1)
    const [selected,setSelected] = useState(0)
    const [total,setTotal] = useState(product.price)

    const {addToCart} =userCartStore()

    useEffect(()=>{
        if(product.options?.length){
            setTotal(quantity * (parseFloat(product.price) +parseFloat(product.options[selected].additionalPrice)))
        }
        },[quantity,selected,product])

    const handleCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            img: product.image,
            price: total,
            ...(product.options?.length && {
                optionTitle: product.options[selected].title,
            }),
            quantity: quantity,
        })
        toast.success("The product added to the Cart!")
    }
       
          
  return (
    <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>Rs.{total}</h2>
        <div className='flex gap-4'>
            {product.options?.length &&
            product.options?.map((option,index)=> (
                <button
                key={index}
                className={selected === index ? `min-w-[6rem] p-2 ring-1 bg-orange-500 text-white `:`{'min-w-[6rem] p-2 ring-1 ring-red-500'}`}
                onClick={()=> setSelected(index)}>
                    {option.title}
                </button>
            ))}
            
        </div>
        <div className='flex justify-between items-center'>

            <div className='flex justify-between w-full p-3 ring-1 ring-red-500'>
                <span>Quantity</span>
                <div  className="flex gap-4 items-center">
                    <button onClick={() => setQuantiy((prev) => (prev > 1 ? prev -1  :  1))} className='ring-1 px-1'>{"<"}</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantiy((prev) => (prev < 9 ? prev + 1  :  9))} className='ring-1 px-1'>{">"}</button>
                </div>
            </div>
            <button className='uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500' onClick={handleCart}>Add to Cart</button>
        </div>
    </div>
  )
}

export default Price