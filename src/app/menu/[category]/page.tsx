
import Link from "next/link"
import Image from "next/image"
import { ProductType } from "@/types/type"


const getData = async(category: String) =>{
    const res = await fetch(`http://localhost:3000/api/products?cat=${category}`,{
    cache: "no-store"
    })
    if(!res){
      throw new Error("no items")
    }
    return res.json()
}

type Props = {
  params: {category:string}
}

const Category = async ({params}: Props) => {
  const products: ProductType[] = await getData(params.category)
  
  return (
    <div className="flex flex-wrap text-red-500">
      {products.map((item)=>(
      <Link href={`/products/${item.id}`} key={item.id} 
      className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2
        lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-100">
        {item.image && (
           <div className="relative h-[80%]">
           <Image src={item.image} alt="catagories image" fill sizes="100vw" className="object-contain" />
         </div>
          )}
       
        <div className="flex items-center justify-between font-bold">
          <h6 className="w-1/2 uppercase p-2">{item.title}</h6>
          <h2 className="group-hover:hidden text-xl">Rs.{item.price}</h2>
          <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">Add to Cart</button>
        </div>
      </Link>
      ))}
    </div>
  )
}

export default Category