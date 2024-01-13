import { ProductType } from '@/types/type'
import Price from '@/components/Price'
import Image from 'next/image'
import DeleteButton from '@/components/DeleteButton'

const getData = async(id: string) =>{
  const res = await fetch(`http://localhost:3000/api/products/${id}`,{
  cache: "no-store"
  })
  if(!res){
    throw new Error("no items")
  }
  return res.json()
}

type Props = {
  params: {id:string}
}


const SingleProductPage = async ({params}: Props) => {
  
  const singleItem: ProductType = await getData(params.id)
  
  return (
    <div className='p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative'>
    
          <div className='relative w-full h-1/2 md:h-[70%]'>
            {singleItem?.image &&(
               <Image src={singleItem?.image} alt='single product' fill sizes='100vw' className='object-contain'/>
            )}
         
          </div>
        <div className='flex flex-col h-1/2 gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
          <h1 className='text-3xl font-bold uppercase xl:test-5xl text-center'>
           <span>{singleItem?.title}</span> 
            </h1>
          <p className='text-justify'>{singleItem?.desc}</p>
          <Price product={singleItem}/>
          <DeleteButton id={singleItem.id}/>
        </div>
       
       
      </div>
    )
  }
  
  export default SingleProductPage
     
