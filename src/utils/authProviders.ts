import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./connect";

declare module "next-auth"{
    interface Session{
        user: User & {
            isAdmin: boolean
        };

    }
}
declare module "next-auth/jwt"{
    interface JWT {
       
            isAdmin: boolean
        
    }
}


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session:{strategy:"jwt"},
    providers: [
        GoogleProvider({
            // clientId: process.env.GOOGLE_CID as string,
            // clientSecret: process.env.GOOGLE_SECRET as string,
            clientId: process.env.GOOGLE_CID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })
    ],
    callbacks:{
        async session({token,session}){
            if(token){
                session.user.isAdmin = token.isAdmin
            }
                return session
            
        },
        async jwt({token}){
            const userInDb = await prisma.user.findUnique({
                where:{
                    email:token.email!
                }
            })
            token.isAdmin = userInDb?.isAdmin
               return token
            }
        }
    }


export const getAuthSession = () => getServerSession(authOptions); 