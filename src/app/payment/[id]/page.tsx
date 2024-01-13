'use client'
import { StripeElement, StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import CheckoutForm from "@/components/CheckoutForm"


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const PaymentPage = ({params}: {params: {id: string}}) => {
  const {id} = params
  const [clientSecret,setClientSecret] = useState()
  const [amount,setAmount] = useState<number>()

  useEffect(()=>{
    const makeRequest = async() => {
      try{
        const res = await fetch(`http://localhost:3000/api/create-intent/${id}`,{
          method:"POST",
        })
        const data =await res.json()
        setAmount(Math.round(data.paymentIntent.amount / 100))
        setClientSecret(data.clientSecret)
      }
      catch(err){
        console.log(err)

      }
    }

    makeRequest();
  },[id])

  const options:StripeElementsOptions={
    clientSecret,
    appearance:{
      theme:"night",
      variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
       
      }
    }
  }
  return (
    <div>
      {clientSecret && (
       
        <Elements options={options} stripe={stripePromise}>
           <p className="text-center mt-2 text-3xl text-green-500">
            Your total Amount <span className="text-center mt-2 text-3xl text-orange-500 font-bold">Rs.{amount}!</span></p>
          <CheckoutForm/>
        </Elements>
      )}
    </div>
  )
}

export default PaymentPage