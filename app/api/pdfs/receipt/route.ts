import { NextRequest, NextResponse } from "next/server";
//import { receiptTemplate } from "../utils";
import { PDFDocument, PageSizes, StandardFonts, rgb } from "pdf-lib";
import * as fs from "fs";
import path from 'path';
import { jsPDF } from "jspdf";
import * as tables from  "jspdf-autotable";

const fontBytes = fs.readFileSync("public/tacoma-font/TACOMA.ttf");
//const logoBytes = fs.readFileSync("./public/logo.png");
/* export async function POST(req:NextRequest) {
    try {
        const body=await req.json()
        const res= await receiptTemplate(body)
        return NextResponse.json({ok:res.status,url:res.uri,message:"Success"})
    } catch (error:any) {
        console.log("error receiptTemplate",error)
        return NextResponse.json({ok:false,message:error?.message,url:null})
    }
} */

export async function POST(req:NextRequest){
    try{
        const body=await req.json()
        const {data,info}=body
     //   tables.applyPlugin(jsPDF)
        const doc = new jsPDF();

  // Titre
  doc.text("Facture / Receipt", 14, 20);
const keys=Object.keys(data[0])
  const headers =keys.map((k)=>k.replaceAll("code_module","Code")
  .replaceAll("title","Module de formation")
  .replaceAll("price","Frais")
  .replaceAll("id","N°").toUpperCase()) //["Description", "Quantité", "Prix"];
 
 const bodyVals= data.map((d:any,i:number)=>{
    const vals=Object.values(d)
    vals.splice(0,1,i+1)
    return vals
  })
 /*  let colStyles=headers.map((h,i)=>{
        let styles:Partial<tables.Styles>={ cellWidth: i===0?10:[1].includes(i)?50:[3].includes(i)?60:25 , halign:i===4?"right": "center",valign:"middle"}
       return styles
    }) */
  // Tableau auto
  tables.autoTable(doc,{
    head: [headers],
    body: bodyVals,
    styles: { fontSize: 12, },
    columnStyles: {
      0: { cellWidth: 10 , halign: "center",valign:"middle"},
      1: { cellWidth: 50, halign: "left" ,valign:"middle"},
      2: { cellWidth: 20, halign: "center",valign:"middle" },
      3: { cellWidth: 60, halign: "left",valign:"middle" },
      4: { cellWidth: 25, halign: "right" ,valign:"middle"}, 
    },
   
  });

  const pdfBytes = doc.output("arraybuffer");

 const filePath = path.resolve("public", "uploads", "factures", "recu.pdf");
  // Créer les dossiers si besoin
fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.from(pdfBytes));
  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=receipt.pdf",
    },
  });
        } catch (error:any) {
        console.log("error receiptTemplate",error)
        return NextResponse.json({ok:false,error:error?.message,url:null})
    }
}