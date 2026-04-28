"use client"
import { RegisterEmployerComponent } from "@/app/components/employers/enregistrer";
import { RegisterEtudiantComponent } from "@/app/components/etudints/inscription";
import { LoginRegisterWrapper } from "@/app/components/utils";
import { onSubmitEmployer, onSubmitInscriptions,noneOnSubmit } from "@/app/functions/auth";
import { initialState } from "@/app/functions/utils";
import { useActionState,use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default  function  Page ({params}: {params: Promise<{slug: RegisterSlugs}>}) {
    const {slug} =use(params)
   const route=useRouter()
    const [state,onSubmit,pending]=useActionState(slug==="employer"?onSubmitEmployer:slug==="inscription"?onSubmitInscriptions:noneOnSubmit,initialState)

    const formComponent=slug==="inscription"?<RegisterEtudiantComponent pending={pending}
    error_message={state?.isSuccess&&state?.message!==""?state?.message:null} onSubmit={onSubmit} />
    :slug==="employer"?<RegisterEmployerComponent onSubmit={onSubmit} />:<></>
    useEffect(()=>{
      if(state?.isSuccess){

        route.push("/")
      }
    },[state?.isSuccess])
  return (
    <div className="w-full">
      <Button variant={"ghost"} className="flex self-start mr-7 float-start "
       onClick={()=>route.push("/")} >Retour</Button>
        {formComponent}
    </div>
  )
}



