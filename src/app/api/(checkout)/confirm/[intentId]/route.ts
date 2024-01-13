import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req:NextRequest,{ params }: { params: { intentId: string } }) => {
  const { intentId } = params;
  const ORDER_BEING_PREPARED = "Order being prepared!"
  console.log(intentId)
  try {
    if (!intentId) {
        console.error('Invalid intentId. Unable to update.');
        return new NextResponse(
            JSON.stringify({ message: "Invalid intentId. Unable to update." }),
            { status: 400 }
        );
    }
    const existingOrder = await prisma.order.findUnique({
        where: {
            intent_id: intentId,
        },
    });
    if (!existingOrder) {
        console.error('Order not found. Unable to update.');
        return new NextResponse(
            JSON.stringify({ message: "Order not found. Unable to update." }),
            { status: 404 }
        );
    }
        await prisma.order.update({
            where:{
                intent_id: intentId,
            },
            data:{status: ORDER_BEING_PREPARED}
        })
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};