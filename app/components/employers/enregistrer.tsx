'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, UserPlusIcon } from "lucide-react";


export const RegisterEmployerComponent: React.FC<{ children?: React.ReactNode; onSubmit: (formdata:FormData)=>void }> = ({ children, onSubmit })=>{

    return  <Card className="w-[90%] sm:w-[75%] bg-[#0a10919a] backdrop-opacity-35 backdrop-blur-sm shadow-lg p-6 pl-8 h-fit">
        <CardHeader>
          <CardTitle className='opacity-100 text-3xl text-white'>créer un compte</CardTitle>
          <CardDescription>
            <span className='opacity-100 text-xl text-white'>Pour avoir un espace utilisateur</span>
          </CardDescription>
        </CardHeader>
        <CardContent 
           className='gap-4 space-y-4 ' >
            {children?children:<></>}
           <form 
           action={onSubmit}>
        <div className='space-y-5 flex-col mb-7 overscroll-contain'>
             <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className='opacity-100  text-white' htmlFor="nom">Nom</Label>
            <Input  className='opacity-100 bg-white' type="text" id="nom" placeholder="Entrer le nom" name='nom' />
          </div>
           <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className='opacity-100  text-white' htmlFor="prenom">Prénoms</Label>
            <Input  className='opacity-100 bg-white' type="text" id="prenom" placeholder="Entrer le prénom" name='prenom' />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className='opacity-100  text-white' htmlFor="date_nssce">Date de naissance</Label>
            <Input  className='opacity-100 bg-white' type="date" id="date_nssce" placeholder="Entrer la date de naissance" name='date_nssce' />
          </div>
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
              <UserPlusIcon color='white' size={35} />
              Se connecter</Button>
         </form>
          </CardContent>
      </Card>
}