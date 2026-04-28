import { drizzleDb } from "@/app/db"
import { students } from "@/app/db/schemas"
import { eq } from "drizzle-orm"
import { NextRequest,NextResponse } from "next/server"
 const db=drizzleDb
export const GET=async(req:NextRequest, { params }: { params: Promise<{ id: string }> })=>{
    try {
        const {id}=await params
        if(id){
            const student=await db.query.students.findFirst({
                where:eq(students.id,id)
            })
        if(student) return NextResponse.json({
            message:`Succes.`,
            ok:true,
            data:student
        })
        return NextResponse.json({
            message:`Pas d'etudiant avec cette information.`,
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