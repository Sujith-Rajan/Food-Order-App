"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {useQuery,useMutation,useQueryClient } from "@tanstack/react-query"
import { OrderType } from "@/types/type"
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import {toast} from 'react-toastify'
import { useEffect, useState } from "react"



const Orders = () => {
   const {data:session,status} = useSession()
   
   const router = useRouter()
   if(status === 'unauthenticated'){
    router.push('/')
   }
  
   const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      fetch('http://localhost:3000/api/orders').then((res) =>
        res.json(),
      ),
  })
 
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({id,status}: {id: string,status: string}) => {
      return fetch(`http://localhost:3000/api/orders/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status)
      })
    },
    onSuccess(){
      queryClient.invalidateQueries({queryKey:['orders']})
    }
  })

  const [edit,setEdit] = useState(false)
  const [value,setValue] = useState('')
  const [withId,setWithId] = useState('')
  
  const handleEdit = (id: string) => {
    setEdit(true)
    setWithId(id)
  }

  const handleUpdate = (id: string) => {
     console.log(id)
      const status = value
      mutation.mutate({id,status})
      toast.success("The Order Status Changed!")
      setEdit(false)
      console.log(id)
    }
    
     
   
  if(isPending || status ==="loading") return <p>Loading...</p>
  return (
    <div className='p-4 lg:px-20 xl:px-40'>
      <table className='w-full border-separate border-spacing-3'>
        <thead>
          <tr className='text-left'>
            <th className='hidden md:block'>Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th  className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType)=> (
          <tr className='bg-red-50 text-sm md:text-base' key={item.id}>
            <td className='hidden md:block py-6 px-1'>{item.id}</td>
            <td className='py-6 px-1'>{item.createdAt.toString().slice(0,10)}</td>
            <td className='py-6 px-1'>{item.price}</td>
            {item.products.map(prdct=> (
            <td  className="hidden md:block py-6 px-1">{prdct.title}</td>
            ))}
           
            {session?.user.isAdmin ?
             (<td>
             
                <input type="text" 
               {...(edit ? { placeholder: item.status } : { value: item.status })}
                 className="p-2 ring-1 ring-red-100 rounded-md" onChange={(e)=>setValue(e.target.value)} />
                 {edit && item.id === withId ? ( <button className="bg-red-400 p-2 rounded-full ml-1 cursor-pointer text-white"
                  onClick={()=>handleUpdate(item.id)}>
                    <IoSaveOutline  className='text-xl' title='save' />
                  </button>)
                  :
                  (
                   <button className="bg-red-400 p-2 rounded-full ml-1 cursor-pointer" onClick={()=>handleEdit(item.id) }>
                   <CiEdit className='text-xl  text-white' title="edit" />
                   </button>
                 )}
               
               
             </td>)
             :
             (<td> <td className='py-6 px-1'>{item.status}</td></td>)}
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders