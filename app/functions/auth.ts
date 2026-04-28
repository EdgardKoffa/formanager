'use server'
import {signIn} from '@/app/api/auth/auth'
import axios from 'axios'

export const onSubmit=async(prevState: any, formdata:FormData) => {
    //  "use server";
    const email=formdata.get("email")
    const password=formdata.get("password")
    console.log("prevState",prevState,"formdata",email)
      const res:any= await signIn("credentials", {email,password,redirect:false}) 
       console.log("res",res)
       prevState.isSuccess=res?.ok
      if (res?.error) {

  console.log("Erreur:", res.error)
  prevState.message='Erreur de connexion cause: ' + res.error 
  return  { isSuccess:false,message: 'Erreur de connexion cause: ' + res.error }
} else {
  console.log("Connexion réussie:", res)
  prevState.message='Connexion réussie'
  prevState.redirectTo= "/"
  return  {isSuccess:true, message: 'Connexion réussie',redirectTo: "/" }
}
      }
/*  */

    export  const onSubmitEmployer=async(prevState: any,formdata:FormData)=>{
      // "use server";
     
       return prevState//{ message: 'Inscription réussie' }
    }

    export  const onSubmitInscriptions=async(prevState: any,formdata:FormData)=>{
      // "use server";
     try {
      const res=await axios.post(`/api/etudiants`,formdata)
      console.log("res.data",res.data)
      if(res.data&&res.data.data){
       const data=res.data.data
       
        return  { isSuccess:false,message: res.data?.message }

      }else{
        return  { isSuccess:false,error: "Erreur d'inscription cause: " + res.data.message ||res.status}
      }
     } catch (error:any) {
     return  { isSuccess:false,error: "Erreur d'inscription cause: " + error.message }

     }
      // return prevState//{ message: 'Inscription réussie' }
    }


export  const noneOnSubmit=async(prevState: any,formdata:FormData)=>{     
       prevState.message='Rien a soumettre' 
  return prevState// { message: 'Rien a afficher' }
    }