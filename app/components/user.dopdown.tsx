"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useRouter} from 'next/navigation'


export const UserDropDown=({session,data}:{session:any
  data?:Array<DropDownItemsDataItem>
})=>{
  const router=useRouter()
  return  <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='shadow-sky-100 rounded-full p-0 ' variant="ghost">
            <Avatar>
  <AvatarImage src={session?.user?.image} alt={session?.use?.email}/>
  <AvatarFallback className="text-xl font-bold">{`${session?.user?.email}`?.slice(0,2).toUpperCase()}</AvatarFallback>
  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
</Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit mr-5">
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon />
          {session?.user?.email}
        </DropdownMenuItem>
       {data&&data?.length>0&&<>
       {data.map((item,index)=><DropdownMenuItem 
        key={index} 
        
        className="cursor-pointer"
         onClick={()=>{
          if(item?.url){
           router.push(item?.url)
          }
          }}
        >
         {item?.icon? item?.icon:<></>}
         {item?.itemLabel?item?.itemLabel:""}
        </DropdownMenuItem>)}</>}
        {/* <DropdownMenuItem className="cursor-pointer">
          <SettingsIcon />
          Settings
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" variant="destructive" onClick={(e)=>{
         // e.preventDefault()
          signOut({redirectTo:"/"})}}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem> 
      </DropdownMenuContent>
    </DropdownMenu>
}