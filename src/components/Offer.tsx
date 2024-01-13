import Image from "next/image"
import CountDown from "./CountDown"

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row">
      <div className="flex-1 text-white  flex flex-col justify-center items-center text-center gap-2">
        <h1 className="text-3xl font-bold">Tasty Trio Eatery: A Culinary Adventure</h1>
        <p>Delcious Pizza, Burger, and Fried Chicken</p>
        <div className="w-full">
        <CountDown/>
        </div>
       <button className="bg-red-500 rounded-md py-3 px-6">Order Now</button>
      </div>
      <div className="relative flex-1 rounded-lg w-full">
        <Image src="https://img.freepik.com/free-photo/delicious-pizza-indoors_23-2150873874.jpg?t=st=1704352809~exp=1704356409~hmac=3aa7930f8e510a0b8773fab8c87ee9a6ab976f80316dc73264df85a54f886683&w=1380" 
        alt="offer image" fill className="object-contain"></Image>
      </div>
    </div>
  )
}

export default Offer