/* "use server"
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import path from 'path';
///import  PDFDocument  from 'pdfkit-table';
export const receiptTemplate=async({data,info}: { data: any[], info?: any })=>{
    const filePath = path.join(process.cwd(),"public",'uploads','factures', 'recu.pdf');
   
    console.log("filePath",filePath)

    if(data?.length === 0) return {status:false,uri:null};

    const doc = new PDFDocument({ margin: 30, size: "A6" });

  // Charger ta police personnalisée
  const fontPath = path.join(process.cwd(), "public", "tacoma-font", "TACOMA.ttf");
  console.log("font path",fontPath)
  doc.font(fontPath);

    try {
        const headers=Object.keys(data[0]).map((key)=>(key.toUpperCase().replaceAll("_"," ")));
        const rows=data.map((item)=>Object.values<string>(item));
        const tableData=[headers,...rows]

        doc.fontSize(12);
        doc.text("Facture", { align: 'center' })
        .text(`N° ${info?.numero || 'N/A'} `, { align: 'left' })
        .table({
            columnStyles:(i)=>{
                return {
                    width: 100,
                    //align: 'center',
                    //backgroundColor:"#2c5ee8",
                    //textColor:"white",
                    //padding:10
                }
            },
            rowStyles:(i)=>{
                return {
                    height:i>0? 30:40,
                    backgroundColor:i>0? (i%2===0? "#f0f0f0":"white"):"#2c5ee8",
                    textColor:i>0? "black":"white",
                    padding:7,

                }
            },
    data:tableData
})
.text(`Ce recu va servir de preuve de paiement pour la facture N° ${info?.numero || 'N/A'}`, { align: 'left' })


doc.pipe(fs.createWriteStream(filePath));

return {status:true,uri:filePath};
   
} catch (error:any) {
        console.log(" receiptTemplate error",error?.message)
        return {status:false,uri:null};
    }finally{
        doc.end();
    }
} */