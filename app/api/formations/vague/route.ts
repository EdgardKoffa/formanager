import { drizzleDb } from "@/app/db"
import { vagueFormation } from "@/app/db/schemas"
import { NextRequest,NextResponse } from "next/server"
 const db=drizzleDb
export const GET=async()=>{
    try {
        const allvagues=await db.query.vagueFormation.findMany()
      return  NextResponse.json({
        message:`Recuperation reussite avec succes`,
        ok:true,
        data:allvagues
      })
    } catch (error:any) {
        return NextResponse.json({
            message:`Erreur de recupration de toutes les vagues de formation; cause: ${error?.message}`,
            ok:false,
            data:null
        })
    }
}

export const POST=async(req:NextRequest,resp:NextResponse)=>{
    try {
        const body=await req.json()
        const vagueSaved=await db.insert(vagueFormation)
        .values(body).returning()
        if( vagueSaved.length>0){
            return NextResponse.json({
                message:"La vague de formation "+vagueSaved[0].title+" enregistrée avec succès.",
                data:vagueSaved[0],
                ok:true
            })
        }
        return{
             message:`La vague de formation n'a pas pu être enregistrée.`,
            ok:false,
            data:null
        }
    } catch (error:any) {
         return NextResponse.json({
            message:`Erreur d'enregistrement de la vague de formation; cause: ${error?.message}`,
            ok:false,
            data:null
        })
    }
}