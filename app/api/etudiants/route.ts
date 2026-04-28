import { drizzleDb } from "@/app/db"
import { students } from "@/app/db/schemas"
import { NextRequest,NextResponse } from "next/server"
 const db=drizzleDb
export const GET=async()=>{
    try {
        const allStudent=await db.query.students.findMany()
      return  NextResponse.json({
        message:`Recuperation reussite avec succes`,
        ok:true,
        data:allStudent
      })
    } catch (error:any) {
        return NextResponse.json({
            message:`Erreur de recupration de tous les étudiant; cause: ${error?.message}`,
            ok:false,
            data:null
        })
    }
}

export const POST=async(req:NextRequest,resp:NextResponse)=>{
    try {
        const body=await req.json()
        console.log("body",body)
        const studentSaved=await db.insert(students)
        .values(body).returning()
        if( studentSaved.length>0){
            return NextResponse.json({
                message:"L'étudiant(e) "+studentSaved[0].firstName+" "+studentSaved[0].lastName+" inscrit(e) avec succès.",
                data:studentSaved[0],
                ok:true
            })
        }
        return{
             message:`L'étudiant(e) n'a pas pu être enregistré(e).`,
            ok:false,
            data:null
        }
    } catch (error:any) {
        console.log("++++error",error?.message)
         return NextResponse.json({
            message:`Erreur d'enregistrement de l'étudiant; cause: ${error?.message}`,
            ok:false,
            data:null
        })
    }
}