"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadCloudinary from "@/utils/cloudinary";
import { toast } from "react-toastify";

type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
}
type Option = {
    title: string;
    additionalPrice: number;
}

const AddPage = () => {

    const {data: session,status} = useSession()
    const router = useRouter()
    const[inputs,setInputs] = useState<Inputs>({
        title: '',
        desc: '',
        price: 0,
        catSlug:'',
    })

    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0,
      });

    const [options, setOptions] = useState<Option[]>([]);
    const[file,setFile] = useState<File>()

    

    if(status === "loading"){
        return <p>Loading....</p>
    }
    if(status ==="unauthenticated" || !session?.user.isAdmin){
        router.push("/");
      }

    

     const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];
        setFile(item);
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs((prev) => {
            return {...prev,[e.target.name]: e.target.value}
        })
    }
    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption((prev) => {
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
           
            const url = await uploadCloudinary(file!)
            const res  = await fetch("http://localhost:3000/api/products",{
                method:"POST",
                body: JSON.stringify({
                    image:url,
                    ...inputs,
                    options,
                })
            })
            const data = await res.json()
            toast.success("One Product Created")
            router.push(`/products/${data.id}`);
           
        }
        catch(err){
            console.log(err)
        }

    }

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-100vh  flex items-center justify-center text-red-500">
        <form  className="felx flex-wrap gap-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl md:text-4xl mb-2 text-gray-300 font-bold">Add New Product</h1>
            <div className="w-full flex flex-col gap-2 ">
                <label htmlFor=""  className="text-sm  flex gap-4 items-center relative">
                <FaCloudUploadAlt className='text-orange-500 text-3xl' />
                    <span>Upload Image</span>
               
                <input
                 type="file" 
                 onChange={handleChangeImg}
                 id="file"
                 className="absolute text-black w-full  z-10 opacity-1 "
                 />
                  </label>
            </div>
            <div className="w-full flex flex-col gap-2">
                <label  className="text-sm">Title</label>
                <input 
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                placeholder="Bella Napoli"
                type="text"
                name="title"
                onChange={handleChange} />
            </div>
            <div className="w-full flex flex-col gap-2">
                <label className="text-sm">Description</label>
                <textarea 
                 rows={3}
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
                 name="desc"
                 onChange={handleChange}>

                 </textarea>
            </div>
            <div className="w-full flex flex-col gap-2 ">
                <label className="text-sm">Price</label>
                <input 
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                type="text"
              
                placeholder="29"
                name="price"
                onChange={handleChange} />
            </div>
            <div className="w-full flex flex-col gap-2 ">
                <label className="text-sm">Category</label>
                <input 
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                type="text"
                placeholder="pizzas"
                name="catSlug"
               onChange={handleChange} />
            </div>
            <div className="w-full flex flex-col gap-2 ">
                <label className="text-sm">Options</label>
                <div className="flex">
                    <input 
                    className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={changeOption} />
                    <input
                     className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                     type="text"
                     placeholder="Additional Price"
                     name="additionalPrice"
                     onChange={changeOption}/>
                    <button
                      className="bg-gray-500 p-2 text-white"
                      onClick={(event) =>{ event.preventDefault();setOptions((prev) => [...prev, option])}}
                    >
                        Add Option</button>
                </div>

                <div className="flex flex-wrap gap-4 mt-2">
                    {options.map((opt)=>(
                    <div key={opt.title}
                     className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                     onClick={() =>
                        setOptions((prev) =>
                          prev.filter((item) => item.title !== opt.title)
                        )
                      }
                     >
                        <span>{opt.title}</span>
                        <span className="text-xs">(+ Rs.{opt.additionalPrice})</span>
                    </div>
                    ))}
                </div>
            </div>
            <button  className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center" >
                Submit
            </button>
        </form>
    </div>
  )
}

export default AddPage