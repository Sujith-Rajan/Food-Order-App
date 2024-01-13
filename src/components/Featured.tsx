import Image from "next/image"
import { ProductType } from "@/types/type"

const getData = async() => {
  const res = await fetch("http://localhost:3000/api/products",{
    cache: "no-store"
  })
  if(!res){
    throw new Error("No Featured item")
  }
  return res.json()
}

const Featured = async() => {
  const featuredProducts: ProductType[] = await getData()
 
  return (
    <div  className='w-screen overflow-x-scroll text-red-500'>
      <div className='w-max flex'>
        {featuredProducts.map((item)=>(
          <div key={item.id} className='w-screen h-[60vh] flex flex-col items-center justify-around max-lg:h-[80vh]
          p-4 hover:bg-fuchsia-50 transition-all duration-300  md:w-[50vw] xl:w-[33vw] xl:h-[90vh]'>
            {item.image &&
            (
              <div className="relative flex-1 w-full ">
              <Image 
               src={item.image} 
               alt="fetured image"
                fill sizes="100vw"
                 className="object-contain transition-transform duration-500 transform hover:scale-110"></Image>
           </div>
            )
            
            }
           
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4 2xl:p-8 text-justify">{item.desc}</p>
              <span className="text-xl font-bold">Rs.{item.price}</span>
              <button className="bg-red-500 text-white p-2 rounded-md">Add to Cart</button>
            </div>      
          </div>
             ))} 
      </div>   
   
    </div>
  )
}

export default Featured