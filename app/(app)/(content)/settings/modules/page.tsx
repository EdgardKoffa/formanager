'use client'
import { CustomModalDialog } from '@/app/components/modal.dialog'
import { mainCardClassNames } from '@/app/functions/utils'
import { moduleSchema } from '@/app/zod.schemas/formation.zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { DeleteIcon, EditIcon, SaveIcon } from 'lucide-react'
import { useRouter,useSearchParams} from 'next/navigation'
import { SubmitEvent, useEffect, useState } from 'react'
import ModulesDataTable from './data-table'
import { ErrorField } from '@/app/components/utils'

function Page() {
  const searchParams=useSearchParams()
  const addModule=searchParams.get("action")
  const data=searchParams.get("data")
const [open,setOpen]=useState(false)
const [isList,setIsList]=useState(false)
const [allModule,setAllModule]=useState<ModuleFormation[]>([])
const [errors, setErrors] = useState<Record<string, string>>({});
const initForm:ModuleFormation={
  id:data?data:null,
  title: '',
  code_module: '',
  description: null,
  price: ''
}
const [formdata,setFormdata]=useState<ModuleFormation>(initForm)

const [isLoading,setIsLoading]=useState(false)
const route=useRouter()

const handleClick=async(e: SubmitEvent<HTMLFormElement>)=>{
  e.preventDefault()
  e.stopPropagation()
  try {
    setIsLoading(true)
  const formData = new FormData(e.currentTarget);
  const formValues:ModuleFormation={
    id:data?data:null,
    title: formData.get("title") as string,
    code_module: formData.get("code_module") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string
  }
  const validation=moduleSchema.safeParse(formValues)

  if(validation.success){
  const res=data?
  await axios.put("/api/formations/modules",validation.data): await axios.post("/api/formations/modules",validation.data)

   console.log("res ",res.data)
   if(res.data&&res.data.ok===true){
     setOpen(false)
    setFormdata(initForm)
    setIsList(true)
    route.replace("/settings/modules?action=view")
    setIsLoading(false)
   }else{

   }
}else{
   console.log("----",validation.error)
const formatted: Record<string, string> = {};

      validation.error.issues.forEach((err:any )=> {
        formatted[err.path[0] as string] = err.message;
      });
      console.log("----",formatted)
      setErrors(formatted);
}
 
  } catch (error:any) {
    console.log("Error adding modules",error?.message)
    
  }finally{
    setIsLoading(false)
  }
}

const initData=async()=>{
  try{
    setIsLoading(true)
    setOpen(false)
    const res=await axios.get("/api/formations/modules")
    if(res.data&&res.data?.data){
      setAllModule(res.data?.data)
    }else{

    }
  }catch(e:any){
    console.log("error initindata",e?.message)

  }finally{
    setIsLoading(false)
  }
}

useEffect(()=>{
if(addModule&&addModule==="add"){
  setAllModule([])
setOpen(true)
setIsList(false)
}
if(addModule&&addModule==="edit"){
  setOpen(true)
  const currentItem=allModule.find((i)=>i?.id===data)
setIsList(false)
setFormdata(currentItem||initForm)
}
if(addModule&&(addModule==="view"||(addModule==="view"&&data))){
  setIsList(true)
  initData()
}
if(!addModule||addModule===""){
route.push("/")
}
},[addModule,data,isList])


  return (<div className='w-full flex flex-col'>
    {isList&&<div className='w-full flex flex-col'>
    <h2>Liste des modules de formation</h2>
    <div>
    <ModulesDataTable data={allModule?.map((d,index)=>{
      return {...d,id:index+1,action:d}
    })} />
    </div>
    <div className='flex w-full'>
    <Button onClick={async(e)=>{
      e.preventDefault()
      const res=await axios.post("/api/pdfs/receipt",{
        data:allModule,
        info:{numero:"xxxxxx"}
      })
      console.log("res",res.data)
    }} >Imprimer</Button>
    </div>
    </div>}
    <CustomModalDialog 
  //  content_size='default'
  style={{
    width:520
  }}
    showCloseButton={false}
    content_className={mainCardClassNames}
    title={<span className='text-2xl font-bold'>{(data?"Modification":"Ajout")+" d'une module"}</span>}
    open={open}
     onOpenChange={setOpen} >
    <form 
    onSubmit={handleClick}
    className='flex flex-col space-y-4 text-white '
    style={{

    }}>
    <div className='flex mt-12 space-x-4 text-white' >
    <div 
    style={{
    }}
    className='flex flex-col flex-1 space-y-2 w-4/5'>
    <Label htmlFor='module_title'>Nom du module de formation:</Label>
    <Input
    defaultValue={formdata?.title||""}
    type='text' name="title" id='module_title' 
    className='bg-[#dff9f8] shadow-xl shadow-blue-300 text-black'
    style={{
      color:"darkblue",
      backgroundColor:"ButtonFace"
    }}
    />
    <ErrorField errorField={errors?.title} />
    </div>
     <div 
     style={{
    }}
     className='flex flex-col space-y-2 w-1/5'>
    <Label htmlFor='module_code'>Code:</Label>
    <Input 
    defaultValue={formdata.code_module||""}
    type='text' name="code_module" id='module_code' 
    style={{
      color:"darkblue",
      backgroundColor:"ButtonFace"
    }}
    />
     <ErrorField errorField={errors?.code_module} />
    </div>
    </div>
    
 <div className='space-y-2' >
    <Label htmlFor='module_pice'>Frais de formation:</Label>
    <Input 
    defaultValue={formdata.price||"0"}
    type='number' name="price" id='module_price'
    style={{
      color:"darkblue",
      backgroundColor:"ButtonFace"
    }}
    />
     <ErrorField errorField={errors?.price} />
    </div>

     <div className='space-y-2' >
    <Label htmlFor='module_description'>Description:</Label>
    <Textarea 
    defaultValue={formdata.description||""}
    name="description" id='module_description'
    style={{
      color:"darkblue",
      backgroundColor:"ButtonFace"
    }}
    />
     <ErrorField errorField={errors?.description} />
    </div> 
    <div className='flex gap-4 mt-10 items-center justify-center'>
    <Button variant={"destructive"} onClick={()=>{
      setOpen(false)
      route.push("/")
    }} >Fermer</Button>
  <Button 
  disabled={isLoading}
  type='submit'
className='bg-[#ccc]'
style={{
  backgroundColor:"#039406",
  marginLeft:20
}}
  >
   {isLoading?<span className='flex flex-row p-1 gap-2'><Spinner/> En cours...</span> :
   <span className='flex flex-row p-1 gap-2'><SaveIcon/> {data?"Modifier":"Enregistrer"}</span> }
    </Button>
    </div>
    </form>
    </CustomModalDialog>
  </div>)
}

export default Page