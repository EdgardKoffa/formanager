'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderInputIcon, LockIcon, UserPlusIcon } from "lucide-react";
import { DatePicker, ErrorAlert, ErrorField, NationaliteSelectBox, SelectBox, TypePieceIDSelectBox } from "../utils";
import { Spinner } from "@/components/ui/spinner";
import { useCallback, useEffect, useState,startTransition } from "react";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper"
import { CheckIcon, LoaderCircleIcon } from 'lucide-react'
import { studentZodSchema, studentZodSchema1, studentZodSchema2, studentZodSchema3, studentZodSchema4 } from "@/app/zod.schemas/students";
import { getZodErrorMessage } from "@/app/zod.schemas/utils";
import { Field, FieldDescription, FieldLabel, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {nationalities} from '@/app/functions/nationalities'
import Image from "next/image";
import axios from 'axios'
import {  getNationaliteLabel, getSelectBoxLabel, getTypePieceIdLabel, niveau_etudes } from "@/app/functions/utils";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/app/functions/server.functions";
const steps = [{title:"Etat civil"}, {title:"Coordonnées"}, {title:"Pièce d'identé"}, {title:"Finalisation"},{title:"Résumé"}]


export const RegisterEtudiantComponent: React.FC<{ children?: React.ReactNode; onSubmit: (formdata:FormData)=>void;pending:boolean,error_message:string}> = ({ children, onSubmit,pending,error_message })=>{
  // Initialisation d'un objet Student
const newStudent: Student = {
  id: crypto.randomUUID(),   // ou généré par Postgres
  userId: undefined,         // optionnel
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  personne_a_contacter: "",
 // createdAt: new Date(),
  email: "",
  genre: undefined,          // "M" ou "F"
  date_de_naissance: undefined,
  lieu_de_naissance: "",
  nationalite: "",
  niveau_etude: "",
  modulesId: "",
  date_inscription: new Date(),
  piece_id_number: "",
  piece_id_type: "",
  autre_piece_id: "",
  photo_id: "",
  numero_matricule:""
}
const [stepeds,setStepeds]=useState<Set<number>>(new Set([1]))
const [errors,setErrors]=useState<any|null>(null)
const [currentStep, setCurrentStep] = useState(1)
const [modules_formation,setModules_formation]=useState<SelectBoxType[]>([])
const [formFieldData,setFormFieldData]=useState<Student>(newStudent)
const [previewer,setPreviewer]=useState("")
const formFields: Record<string, any> = {}

const handleFileSelect=async(file:File)=>{
  try {
   // const newfile =new File([],file)
   const nomFile=`${formFieldData.firstName}-${formFieldData.lastName}`
   const resfile=await uploadFile(file,nomFile,"etudiants")
   if(resfile.success&&resfile.url){
    setErrors({...errors,photo_id:null})
   // const blobFile=new Blob([file])
    const url=resfile.url//URL.createObjectURL(blobFile)
   
    setFormFieldData({...formFieldData,photo_id:url})
    console.log("ffffile",resfile.filename,url)
     setPreviewer(url)
  }else{
    const errorMsg=resfile.error
    setErrors({...errors,photo_id:errorMsg})
  }
  } catch (error:any) {
    console.log("selecting file error",error?.message)
  }
}

const inidata=useCallback(async()=>{
try {
  const resModules=await axios.get("/api/formations/modules")
  if(resModules.data&&resModules.data?.data?.length>0){
    const modules:SelectBoxType[]=resModules.data?.data?.map((m:ModuleFormation)=>{
      const item:SelectBoxType={
        key:m?.id,
        value:m.id,
        label:m.title
      }
      return item
    })
    setModules_formation(modules)
  }
  console.log("resModules",resModules.data)
} catch (error:any) {
  console.log("erreur from init data",error?.message)
}
},[])

const onChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement|any>) => {
  const { name, value,type,files } = e.currentTarget
if(name&&name!==""){
  if(type==="file"){
     console.log("type",type,"value",value,"files",files[0])
     handleFileSelect(files[0])
  }else{
 setErrors({...errors,[name]:""})  
  setFormFieldData(prev => ({
    ...prev,
    [name]: value,
  }))
}
}

}
const codiFication=async()=>{
  try {
     const res=await axios.get("/api/etudiants")
    const allStudent=res.data&&res.data?.ok?res.data.data:[]
    const currentYear=new Date().getFullYear()
    const AllForCurrYear=(allStudent?.length>0?allStudent?.filter((s:any)=>new Date(s?.date_inscription).getFullYear()===currentYear):[]).length+1
    const code_formation=modules_formation.find((m)=>m?.value===formFieldData.modulesId)?.label?.slice(0,2).toUpperCase()
    const code_genre=formFieldData.genre
const num=`${currentYear}-${code_formation}-${(AllForCurrYear+"").padStart(4,"0")}-${code_genre}`
console.log("num",num)
setFormFieldData({...formFieldData,numero_matricule:num})
  } catch (error:any) {
    console.log("erreur geting codification",error?.message)
  }
}
const  handleOnSubmit=async(e:any)=>{
  startTransition(()=>{    
  e.preventDefault()
     
const formdata=new FormData()
  const values= Object.values(formFieldData)

  Object.keys(formFieldData).forEach((key, index) => {
   // formFields[key] = val
   
   if(key.startsWith("date")||values[index] instanceof Date){
    formdata.append(key,new Date(values[index]).toISOString())
   }else{
    formdata.append(key,values[index])
   }
    
  })

  //setFormFieldData({...formFieldData})
  //console.log(formFieldData,"formFields",file,)
  
//console.log("formFields",formFieldData)
            const validation=studentZodSchema.safeParse(formFieldData)
            if(validation.success){
                onSubmit(formdata)
            }else{
                const errorsMsg=getZodErrorMessage(validation.error)
                setErrors(errorsMsg)
                console.log("errorsMsg",errorsMsg)
            }
          })
        }
        useEffect(()=>{
          inidata()
        },[])   
    return  <Card className="w-[95%] sm:w-[85%] bg-[#0a10919a] backdrop-opacity-35 backdrop-blur-sm shadow-lg p-6 pl-8 h-fit">
        <CardHeader>
          <CardTitle className='opacity-100 text-2xl text-white'>Inscription</CardTitle>
        </CardHeader>
        <CardContent 
           className='gap-4 space-y-2  scroll-auto  ' >
            {error_message&&<ErrorAlert message={error_message} />}
           <form >
             <Stepper
      className="w-full"
      //defaultValue={currentStep}
       value={currentStep}
      onValueChange={setCurrentStep}
      indicators={{
        completed: (
          <CheckIcon  className="size-3.5" />
        ),
        loading: (
          <LoaderCircleIcon  className="size-3.5 animate-spin" />
        ),
      }}
    >
     <StepperNav className="mb-5">
        {steps.map((step,index) => (
          <StepperItem key={index} step={index+1} loading={index+1 ===currentStep&&index+1<= steps.length}>
            <StepperTrigger
            disabled={!stepeds.has(index+1)}
            type="button"
             onClick={(e)=>{
              e.preventDefault()
              if(stepeds.has(index+1)){
              setCurrentStep(index+1)
            }
            }} className={cn("flex flex-col justify-end ",stepeds.has(index+1)?"cursor-pointer":"")}>
                {currentStep>=index+1&&<StepperTitle className=" font-bold p-0 m-0 bg-transparent">{step?.title}</StepperTitle>}
               <StepperIndicator className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=inactive]:text-gray-500 p-0 m-0">
              </StepperIndicator>
             
            </StepperTrigger>
            {steps.length > index+1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-green-500 p-0 m-0 z-50" />
            )}
           
          </StepperItem>
        ))}
      </StepperNav>
         <StepperPanel className="text-sm">
        {steps.map((step,index) => (
          <StepperContent
            className="flex w-full items-center justify-center scroll-auto"
            key={index}
            value={index+1}
          >
    <div className="w-full">
        {/* step 1 */}
   {index+1===1&& <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 overflow-auto h-fit p-2">
      {/* Prénom */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="firstName">Nom</Label>
        <Input className="bg-white" id="firstName" 
        name="firstName"
        value={formFieldData.firstName}
        onChange={onChangeValue}
        />
        <ErrorField errorField={errors?.firstName} />
      </div>
      {/* Nom */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="lastName">Prénom</Label>
        <Input className="bg-white" id="lastName" 
        onChange={onChangeValue}
        required
        value={formFieldData.lastName}
        name="lastName" />
          <ErrorField errorField={errors?.lastName} />
       </div>
      {/* Date de naissance */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="date_de_naissance">Date de naissance</Label>
        <DatePicker  
        id="date_de_naissance" 
        name="date_de_naissance"
      
        selected={new Date(formFieldData.date_de_naissance!)}
       onSelect={(v)=>{
        setFormFieldData({...formFieldData,date_de_naissance:new Date(v)})
       }}
       onChangeValue={onChangeValue}
        />
        <ErrorField errorField={errors?.date_de_naissance} />
        </div>

      {/* Lieu de naissance */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="lieu_de_naissance">Lieu de naissance</Label>
        <Input className="bg-white" id="lieu_de_naissance" 
        value={formFieldData?.lieu_de_naissance}
        onChange={onChangeValue}
        required
        name="lieu_de_naissance" />
          <ErrorField errorField={errors?.lieu_de_naissance} />
         </div>
  {/* Genre */}
  <div className="flex flex-col gap-2">
      <FieldSet className="flex items-center flex-row gap-1.5">
        <FieldDescription className="text-white font-bold">Genre</FieldDescription>
        <RadioGroup 
        required
        value={formFieldData.genre}
        className="flex flex-row" 
        orientation="horizontal"
        name="genre"
        //onChange={onChangeValue}
        onSelect={(e)=>{
          console.log('current',e.currentTarget)
        }}
        >
          <Field orientation={"horizontal"} data-invalid>
            <RadioGroupItem
             checked={formFieldData.genre==="M"}
            onClick={(e)=>{
              e.currentTarget.name="genre"
              onChangeValue(e)}}
              id="Homme" 
              value="M"  />
        <FieldLabel className="text-white" htmlFor="Homme">Homme</FieldLabel>
        {/* <Input className="bg-white" id="genre" name="genre" placeholder="M/F" /> */}
        </Field>
         <Field orientation={"horizontal"} data-invalid>
            <RadioGroupItem 
            checked={formFieldData.genre==="F"}
             id="Femme" value="F"
            onClick={(e)=>{
              e.currentTarget.name="genre"
              onChangeValue(e)}}  />
        <FieldLabel className="text-white" htmlFor="Femme">Femme</FieldLabel>
        {/* <Input className="bg-white" id="genre" name="genre" placeholder="M/F" /> */}
        </Field>
      </RadioGroup>
      </FieldSet>
        <ErrorField errorField={errors?.genre} />
      </div>
      {/* Nationalité */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="nationalite">Nationalité</Label>
       {/*  <Input className="bg-white" id="nationalite" name="nationalite" /> */}
        <NationaliteSelectBox name="nationalite" id="nationalite" 
        value={formFieldData.nationalite} 
        onValueChange={(v)=>{
          setFormFieldData({...formFieldData,nationalite:v})
        }} 
        onChange={onChangeValue}
        />
          <ErrorField errorField={errors?.nationalite} />
      </div>
</div>}
{/* step 2 */}
{index+1===2&& <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 overflow-auto h-fit p-2">
      {/* Téléphone */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="phone">Téléphone</Label>
        <Input className="bg-white" 
        type="tel"
        id="phone" name="phone"
        value={formFieldData.phone}
        onChange={onChangeValue}
        />
        <ErrorField errorField={errors?.phone} />
        </div>
{/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="email">E-mail</Label>
        <Input className="bg-white" 
        type="email" id="email" 
        value={formFieldData.email}
        onChange={onChangeValue}
        name="email" />
          <ErrorField errorField={errors?.email} />
      </div>
      {/* Adresse */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="address">Adresse</Label>
        <Input className="bg-white" id="address" 
        value={formFieldData.address}
        onChange={onChangeValue}
        name="address" />
      </div>

      {/* Personne à contacter */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="personne_a_contacter">Personne à contacter</Label>
        <Input className="bg-white" id="personne_a_contacter"
        value={formFieldData.personne_a_contacter}
        onChange={onChangeValue}
        name="personne_a_contacter" />
      </div>
        <ErrorField errorField={errors?.personne_a_contacter} />
    </div>}
    {/* step 3 */}
    {index+1===3&& <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 overflow-auto h-fit p-2">
          {/* Pièce d'identité */}
      <div className="flex flex-col gap-1.5">
         <Label className="text-white" htmlFor="piece_id_type">Type de pièce</Label>
        <TypePieceIDSelectBox 
         onValueChange={(v)=>{
          setFormFieldData({...formFieldData,piece_id_type:v})
        }} 
        onChange={onChangeValue}
        value={formFieldData.piece_id_type} />
          <ErrorField errorField={errors?.piece_id_type} />
      </div>
      
      {formFieldData.piece_id_type==="AUTRE"&&<div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="autre_piece_id">Autre pièce</Label>
        <Input className="bg-white" id="autre_piece_id"
        value={formFieldData.autre_piece_id}
        onChange={onChangeValue}
        name="autre_piece_id" />
        <ErrorField errorField={errors?.autre_piece_id} />
      </div>}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="piece_id_number">Numéro de pièce</Label>
        <Input className="bg-white"
        value={formFieldData.piece_id_number}
        onChange={onChangeValue} 
        id="piece_id_number" name="piece_id_number" /> 
          <ErrorField errorField={errors?.piece_id_number} />
      </div>
       {/* Photo */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="photo_id">Photo</Label>
    
        <Input className="bg-white" type="file" id="photo_id"
        onChange={onChangeValue}
      // value=
        name="photo_id" />
       
         {previewer!==null&&previewer!==""&&
           <div className="flex flex-row  items-center justify-start gap-9 bg-transparent">
      <Image 
      className="bg-transparent aspect-square,"
      style={{width:40,height:30,aspectRatio:1}}
      width={40}
      height={30}
      alt="Photo Id"
      src={previewer} />
      <em className="ml-[14] font-light text-amber-100">{formFieldData.photo_id}</em>
</div>
}
      </div>
    </div>}
    {/* step 4 */}
    {index+1===4&& <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 overflow-auto h-fit p-2">
    {/* Niveau d'étude */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="niveau_etude">Niveau d'étude</Label>
        <SelectBox
        dataItems={niveau_etudes}
        id="niveau_etude" name="niveau_etude"
        value={formFieldData.niveau_etude}
        onValueChange={(v)=>{
          setFormFieldData({...formFieldData,niveau_etude:v})
        }}
        />
      </div>

      {/* Spécialité */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="specialite">Spécialité</Label>
        <SelectBox
        dataItems={modules_formation}
        id="specialite" name="specialite"
        value={formFieldData.modulesId}
        onValueChange={(v)=>{
          setFormFieldData({...formFieldData,modulesId:v})
        }}
        />
      </div>
       <div className="flex flex-col gap-1.5">
        <Label className="text-white" htmlFor="date_inscription">Date d'inscription</Label>
        <DatePicker  
        id="date_inscription" 
        name="date_inscription"
        selected={new Date(formFieldData.date_inscription!)}
       onSelect={(v)=>{
        setFormFieldData({...formFieldData,date_inscription:new Date(v)})
       }}
       onChangeValue={onChangeValue}
        />
          <ErrorField errorField={errors?.date_inscription} />
      </div>
    </div>}
     {index+1===5&& 
     <div className="grid grid-cols-1 gap-6 mb-3 overflow-auto h-fit p-2">
    {/* resume */}
    <h2 className="flex justify-center text-center text-xl p-1 border-2 shadow-xl shadow-blue-200 text-blue-700 bg-indigo-100 rounded-md">Verifiez les informations avant de les enregistrer.</h2>
   {formFieldData.date_inscription&&formFieldData.date_inscription!==null&& 
   <div  className=" flex flex-row  items-center justify-center w-full gap-1.5 text-amber-50">
          <Label className="text-shadow-2xs font-semibold ">{`N° matricule:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.numero_matricule} du {new Date(formFieldData.date_inscription).toLocaleDateString("fr")}</Label>
        </div>}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      
    <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Nom:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.firstName}</Label>
        </div>
       <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Prénom:`}</Label>
          <Label className="font-bold">{formFieldData.lastName}</Label>
        </div>
     <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Date de naissance:`}</Label>
          <Label className="font-bold flex flex-wrap">{new Date(formFieldData.date_de_naissance!).toLocaleDateString("fr")}</Label>
        </div>
        <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Lieu de naissance:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.lieu_de_naissance}</Label>
        </div>
        <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Genre:`}</Label>
          <Label className="font-bold">{formFieldData.lastName==="M"?"Masculin":"Féminin"}</Label>
        </div>
         <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Pièce d'identité:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.piece_id_type==="AUTRE"?formFieldData.autre_piece_id:getTypePieceIdLabel(formFieldData.piece_id_type!)}</Label>
        </div>
         <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`N° de pièce:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.piece_id_number}</Label>
        </div>
        {formFieldData.phone&&formFieldData.phone!==""&& 
        <div  className="gap-2 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Téléphone:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.phone}</Label>
        </div>}
         <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`E-mail:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.email}</Label>
        </div>
        {formFieldData.address&&formFieldData.address!==""&& 
        <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Adresse:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.address}</Label>
        </div>}
        {formFieldData.personne_a_contacter&&formFieldData.personne_a_contacter!==""&& 
        <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Personne à contacter:`}</Label>
          <Label className="font-bold flex flex-wrap">{formFieldData.personne_a_contacter}</Label>
        </div>}
        {formFieldData.nationalite&&formFieldData.nationalite!==""&& 
        <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Nationalité:`}</Label>
          <Label className="font-bold flex flex-wrap">{getNationaliteLabel(formFieldData.nationalite!)}</Label>
        </div>}
        {formFieldData.niveau_etude&&formFieldData.niveau_etude!==""&& 
        <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Niveau d'étude:`}</Label>
          <Label className="font-bold flex flex-wrap">{getSelectBoxLabel(niveau_etudes,formFieldData.niveau_etude)}</Label>
        </div>}
        {formFieldData.modulesId&&formFieldData.modulesId!==""&& 
        <div  className="gap-4 w-full text-amber-50">
          <Label className="text-shadow-2xs font-semibold">{`Module de formation:`}</Label>
          <Label className="font-bold flex flex-wrap">{getSelectBoxLabel(modules_formation,formFieldData.modulesId)}</Label>
        </div>}
    </div>
    </div>}
    </div>
          </StepperContent>
        ))}
      </StepperPanel>
      {/* Buttons */}
      <div className={"flex flex-col sm:flex sm:flex-row gap-5 sm:items-center sm:gap-8 px-6 w-[90%] self-center mx-auto "}>
        
        <Button
        hidden={!(currentStep>1)}
        type="button"
        className="flex float-start justify-self-start w-[200]"
          variant="secondary"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        
        <Button
        hidden={!(currentStep < steps.length)}
       type="button"
        className="flex  float-right w-[200] mr-4"
          variant="secondary"
          onClick={async() => {
            const validationForm=currentStep===1
            ?studentZodSchema1.safeParse(formFieldData)
            :currentStep===2
            ?studentZodSchema2.safeParse(formFieldData)
            :currentStep===3?
            studentZodSchema3(formFieldData.piece_id_type==="AUTRE").safeParse(formFieldData)
            :studentZodSchema4.safeParse(formFieldData)
            
            if(validationForm.success){
               if(currentStep===steps.length-1){
                await codiFication()
            }
            setCurrentStep((prev) => prev + 1)
           setStepeds(new Set([...stepeds,currentStep]))
          }else{
            const errorsMsg=validationForm.error.flatten().fieldErrors
            const errorMsg=getZodErrorMessage(validationForm.error)
            console.log("+++++",errorMsg?.errors,errorsMsg)
            setErrors(errorsMsg)
          }
          }}
          disabled={currentStep === steps.length}
        >
          suivant
        </Button>
         
         <Button
         hidden={!(currentStep===steps.length)}
         disabled={pending}
         onClick={handleOnSubmit} 
          className='flex float-right self-end justify-self-end bg-blue-500 hover:bg-blue-700 opacity-100 my-2 text-white font-bold py-4 px-4 w-[40%]'
            type='button'>
             {pending?<Spinner/>: <UserPlusIcon color='white' size={35} />}
              {pending?"Patientez...":"Enregistrer"}
              </Button>
      </div>
    </Stepper>
        
         </form>
         
          </CardContent>
      </Card>
}