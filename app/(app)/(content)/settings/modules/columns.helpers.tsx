import { Button } from '@/components/ui/button'
import {ColumnDef,createColumnHelper}from '@tanstack/react-table'
import axios from 'axios'
import { DeleteIcon, EditIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'


export const modelsColumnHelper=createColumnHelper<ModuleFormation>()
export const modelsColumn:ColumnDef<ModuleFormationAction>[]=[
    {
        accessorKey: "id",
    header: "N°",
    size:80
    },
    {
        accessorKey:"title",
        header:"Filière",
        size:200
    },
    {
        accessorKey:"code_module",
        header:"Code",
        size:70
    },
    {
        accessorKey:"price",
        header:"Frais de formation",
        size:160
    },
    {
        accessorKey:"description",
        header:"Description",
        size:210
    },
    {
        accessorKey:"action",
        size:200,
        header:"Actions",
        cell({row}) {
            const rowValue=(row.getValue("action")as ModuleFormation)
           const route=useRouter()
           return <div key={rowValue.id} className='flex sm:flex-row flex-col gap-2 '>
       <Button 
       variant={"ghost"}
       onClick={async()=>{
        console.log("edit index",rowValue.id)
       // await handleEditModule(rowValue)
        route.push("/settings/modules?action=edit&data="+rowValue?.id)
       }} > <EditIcon 
       color='#e19509'/></Button>
      <Button 
       onClick={async()=>{
        console.log("delete index",rowValue.id)
        try {
            const res=await axios.delete("/api/formations/modules/"+rowValue.id)
            if(res.data&&res.data?.ok){
                route.replace("/settings/modules?action=view&data="+rowValue.id)
            }else{

            }
        } catch (error) {
            console.log("deleting error",error)
        }
       }}
      variant={"ghost"}>
        <Trash2Icon
         color='#da3b3b'/>
      </Button>
       
      </div>
        },
    }
]

