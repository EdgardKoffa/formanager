import { drizzleDb } from "@/app/db"
import { modules } from "@/app/db/schemas"
import { eq } from "drizzle-orm"
import { NextRequest,NextResponse } from "next/server"
 const db=drizzleDb
export const GET=async(req:NextRequest, { params }: { params: Promise<{ id: string }> })=>{
    try {
        const {id}=await params
        if(id){
            const student=await db.query.modules.findFirst({
                where:eq(modules.id,id)
            })
        if(student) return NextResponse.json({
            message:`Succes.`,
            ok:true,
            data:student
        })
        return NextResponse.json({
            message:`Pas de module avec cette information.`,
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
export const DELETE=async(req:NextRequest, { params }: { params: Promise<{ id: string }> })=>{
    try {
        const {id}=await params
        if(id){
            const student=await db.delete(modules)
            .where(eq(modules.id,id))
            .returning()
           
        if(student.length>0) return NextResponse.json({
            message:`Succes.`,
            ok:true,
            data:student[0]
        })
        return NextResponse.json({
            message:`Pas de module avec cette information.`,
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