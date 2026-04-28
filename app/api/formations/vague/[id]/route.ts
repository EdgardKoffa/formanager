import { drizzleDb } from "@/app/db"
import { vagueFormation } from "@/app/db/schemas"
import { eq } from "drizzle-orm"
import { NextRequest,NextResponse } from "next/server"
 const db=drizzleDb
export const GET=async(req:NextRequest, { params }: { params: Promise<{ id: string }> })=>{
    try {
        const {id}=await params
        if(id){
            const vague=await db.query.vagueFormation.findFirst({
                where:eq(vagueFormation.id,id)
            })
        if(vague) return NextResponse.json({
            message:`Succes.`,
            ok:true,
            data:vague
        })
        return NextResponse.json({
            message:`Pas de vague de formation avec cette information.`,
            ok:false,
            data:null
        })
        }
    } catch (error:any) {
        NextResponse.json({
            message:`Erreur ! cause: ${error?.message}.`,
            ok:false,
            data:null
        })
    }
}