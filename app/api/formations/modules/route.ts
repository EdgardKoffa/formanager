import { drizzleDb } from "@/app/db"
import { modules } from "@/app/db/schemas"
import { NextRequest,NextResponse } from "next/server"
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
//import * as uuidv4 from 'uu'
 const db=drizzleDb
export const GET=async(req:NextRequest)=>{
    try {
        const allModules=await db.query.modules.findMany()
      return  NextResponse.json({
        message:`Recuperation reussite avec succes`,
        ok:true,
        data:allModules
      })
    } catch (error:any) {
        return NextResponse.json({
            message:`Erreur de recupration de tous les modules; cause: ${error?.message}`,
            ok:false,
            data:null
        })
    }
}

export const POST=async(req:NextRequest,resp:NextResponse)=>{
    try {
        const body=await req.json()
        const {id,...toUpdate}=body
        const moduleSaved=await db.insert(modules)
        .values({...body,id:body?.id?body?.id:randomUUID()}).
        onConflictDoUpdate({
            target:modules.id,
            set:toUpdate
        })
        .returning()

        if( moduleSaved.length>0){
            return NextResponse.json({
                message:"Le module "+moduleSaved[0].title+" créé avec succès.",
                data:moduleSaved[0],
                ok:true
            })
        }
        return NextResponse.json({
             message:`Le module n'a pas pu être enregistré.`,
            ok:false,
            data:null
        })
    } catch (error:any) {
        console.log(error)
         return NextResponse.json({
            message:`Erreur d'enregistrement du module; cause: ${error?.message}`,
            ok:false,
            data:null
        })
    }
}
export const PUT=async(req:NextRequest,resp:NextResponse)=>{
    try {
        const body=await req.json()
        console.log("body",body)
        const {id,...toUpdate}=body
        const moduleUpdated=await db.update(modules)
        .set(toUpdate).where(eq(modules.id,id))
        .returning()

        if( moduleUpdated.length>0){
            return NextResponse.json({
                message:"Le module "+moduleUpdated[0].title+" créé avec succès.",
                data:moduleUpdated[0],
                ok:true
            })
        }
        return NextResponse.json({
             message:`Le module n'a pas pu être enregistré.`,
            ok:false,
            data:null
        })
    } catch (error:any) {
        console.log(error)
         return NextResponse.json({
            message:`Erreur d'enregistrement du module; cause: ${error?.message}`,
            ok:false,
            data:null
        })
    }
}

