import { getAuthSession } from "@/utils/authProviders";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

//FETCH ALL ORDERS
export const GET = async(req: NextRequest) => {
    
    const session = await getAuthSession()

    if(session){
        try{
            if(session.user.isAdmin){
                const orders = await prisma.order.findMany()
                return new NextResponse(JSON.stringify(orders),{status: 200})
            }

            const orders = await prisma.order.findMany({
                where:{
                    userEmail: session.user.email!
                }
            })
            return new NextResponse(JSON.stringify(orders),{status: 200})
        }
        catch(err){
            console.log(err)
            return new NextResponse(JSON.stringify({message:'somthing wrong'}),{status:500})
        }
    }
    else{
        return new NextResponse(JSON.stringify({message:'Your are not authenticated'}),{status:401})
    }
}

//POST ORDER
export const POST = async(req:NextRequest) => {
    
    const session = await getAuthSession()
    if(session){
        try{
            const body = await req.json()
            const order = await prisma.order.create({
                data: body
            })
            return new NextResponse(JSON.stringify(order),{status:201})
        }
        catch(err){
            console.log(err)
            return new NextResponse(JSON.stringify("Something Went wrong"),{status:500})
        }
    
    }
    else{
        return new NextResponse(
            JSON.stringify("You ara not Authincticated"),{status: 401}
        )
    }
   
}