import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ActionType,CartType} from "@/types/type";


const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
   
  
}

export const userCartStore = create(persist<CartType & ActionType>((set,get) =>({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
   
    addToCart(item) {

        const products = get().products
        const productsInstate = products.find((product) => product.id === item.id)

        if(productsInstate){
            const updateProducts = products.map((product) => product.id === productsInstate.id
            ?{
                ...item,
                quantity: item.quantity + product.quantity,
                price: item.price + product.price
            }
            : 
            item
            )
            set((state) => ({
                products: updateProducts,
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price,
               
            })) 

        }
            
        else{
            set((state) => ({
                products:[...state.products,item],
                totalItems:state.totalItems+item.quantity,
                totalPrice: state.totalPrice + item.price,
                
                })) 
            }
               
       
    },
    removeFromCart(item) {
        set((state) => ({
            products: state.products.filter((product) => product.id !== item.id),
            totalItems:state.totalItems  - item.quantity,
            totalPrice: state.totalPrice - item.price,
           
        }))
    },
    clearCart(){
        set((state)=>({
            products:[],
            totalItems:0,
             totalPrice: 0,
        }))
    }
}),
{name:"cart",skipHydration:true}
))