import { NextRequest, NextResponse } from "next/server";
import { receiptTemplate } from "../utils";

export async function POST(req:NextRequest) {
    try {
        const body=await req.json()
        const res= await receiptTemplate(body)
        return NextResponse.json({ok:res.status,url:res.uri,message:"Success"})
    } catch (error:any) {
        console.log("error receiptTemplate",error)
        return NextResponse.json({ok:false,message:error?.message,url:null})
    }
}