"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangleIcon, CheckCheckIcon, CircleCheckIcon, CrossIcon, LockIcon } from "lucide-react"
import { LoginRegisterWrapper } from '@/app/components/utils'
import { useActionState } from 'react'
import { onSubmit } from "@/app/functions/auth"
import { initialState } from "@/app/functions/utils"
import { Spinner } from "@/components/ui/spinner"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {toast} from 'sonner'
import { useRouter } from "next/navigation";
import { useEffect } from "react";



function Page() {
  const [state, formAction, pending] = useActionState(onSubmit, initialState)
 const router = useRouter();

 

useEffect(() => {
  if(state?.isSuccess){
  toast.success(<div aria-live="polite" className="flex w-full"><Alert className="w-full  border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-red-50 ">
    <CheckCheckIcon/>
    <AlertDescription>
    {state?.message}
    </AlertDescription>
    <AlertAction>
      {/*  <Button 
       onClick={()=>{
        
       }}
       size="xs" variant="outline">
          <CircleCheckIcon/>
        </Button> */}
    </AlertAction>
  </Alert></div>)
  router.push("/");
 }
}, [state?.isSuccess]);
  return (
    <LoginRegisterWrapper bgImageUrl="/images/bg/bg-login.png">
     {/*  <div className="absolute inset-0 bg-black/50"></div> */}
     
      <Card className="w-[85%] sm:w-[400] bg-[#0a10919a] backdrop-opacity-35 backdrop-blur-sm shadow-lg p-6 pl-8">
        <CardHeader>
          <CardTitle className='opacity-100 text-2xl text-white'>Se connecter</CardTitle>
          <CardDescription>
            <span className='opacity-100 text-xl text-white'>Connectez-vous pour accéder à votre compte</span>
          </CardDescription>
          
        </CardHeader>
        <CardContent 
           className='gap-4 space-y-4' >
           {(!state.isSuccess&&state?.message!=="")&& 
          <div aria-live="polite"><Alert className="min-w-full  border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50" variant={"destructive"}>
           <AlertTriangleIcon/>
            <AlertTitle>
            </AlertTitle>
            <AlertDescription>
            {state?.message}
            </AlertDescription>
            </Alert></div> }
           <form 
            action={formAction} >
        <div className='space-y-5 flex-col mb-7'>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className='opacity-100  text-white' htmlFor="email">E-mail</Label>
            <Input  className='opacity-100 bg-white' type="email" id="email" placeholder="E-mail" name='email' />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label  className='opacity-100  text-white' htmlFor="password">Mot de passe</Label>
            <Input className='opacity-100 bg-white' type="password" id="password" placeholder="Mot de passe" name='password' />
          </div>
          </div>
          <Button 
          className='w-full bg-blue-500 hover:bg-blue-700 opacity-100 my-4 text-white font-bold py-4 px-4'
            type='submit'>
              {!pending&&<LockIcon color='white' size={35} />}
              {pending&&<Spinner data-icon="inline-start" className="text-green-500" />}
              {pending?"En cours...":"Se connecter"}</Button>
         </form>
          </CardContent>
      </Card>
     </LoginRegisterWrapper>
    
  )
}

export default Page