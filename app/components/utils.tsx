import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangleIcon, CalendarIcon, LockIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { ChangeEventHandler, JSX, MouseEventHandler, ReactNode } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { nationalities } from "../functions/nationalities";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { typePieceId } from "../functions/utils";

export const LoginRegisterWrapper: React.FC<{ children: React.ReactNode; bgImageUrl: string }> = ({ children, bgImageUrl }) => {

    return  <div className={`h-full p-20 bg-cover bg-center flex items-center justify-center overscroll-auto object-fill`} 
     style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
        {children}
    </div>

}




export const SuccessAlert=({message}:{message:any})=>{
  return  <div aria-live="polite">
    <Alert className="min-w-full  border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-50" variant={"destructive"}>
           <AlertTriangleIcon/>
            <AlertTitle>
            </AlertTitle>
            <AlertDescription>
            {message}
            </AlertDescription>
            </Alert></div>
}
export const ErrorAlert=({message}:{message:any})=>{
  return  <div aria-live="polite">
    <Alert className="min-w-full  border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50" variant={"destructive"}>
           <AlertTriangleIcon/>
            <AlertTitle>
            </AlertTitle>
            <AlertDescription>
            {message}
            </AlertDescription>
            </Alert></div>
}

export const NavBarMenuitemBtn=({url,icon,label,className,onClick,iconPosition}
  :{url?:string;icon?:JSX.Element;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
    iconPosition?:"right"|"left"
    label:string;className?: string | undefined})=>{
  return <Link
  onClick={onClick}
  style={iconPosition==="right"?{justifyContent:"space-between",paddingRight:7,}:{gap:8}}
  className={className?className:`flex flex-row gap-2 px-3 py-2 border-0 shadow-2xl shadow-blue-50 rounded-lg active:bg-cyan-100 active:text-blue-900 text-[18px] active:font-bold hover:bg-blue-600 hover:text-shadow-yellow-50 hover:text-black items-center`}
  href={url?url:"#"} title={`${label}`}>
     {iconPosition==="left"&&(icon?icon:<></>)}
    {label}
     {iconPosition==="right"&&(icon?icon:<></>)}
  </Link>
}

export const NavBarMenuiSubtemBtn=({url,icon,label,className,onClick,iconPosition}
  :{url?:string;icon?:JSX.Element;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
    iconPosition?:"right"|"left"
    label:string;className?: string | undefined})=>{
  return <Link
  onClick={onClick}
  className={className?className:`flex flex-row items-center transition-all
     px-3 py-2 border-0 shadow-xs shadow-blue-100 
     rounded-sm active:bg-cyan-100
      active:text-black text-[16px] 
      active:font-semibold hover:bg-[#3963f8] 
       hover:text-[#e1e4ed] submenu`}
      
  href={url?url:"#"} title={`${label}`}>
    <style jsx>{`
    .submenu:hover {
 background-color: #3963f8;
 color: #e1e4ed;
    }
    `}</style>
    {iconPosition==="left"&&(icon?icon:<></>)}
    {label}
     {iconPosition==="right"&&(icon?icon:<></>)}
  </Link>
}

export const SelectBox=({dataItems,value,onValueChange,onChange,onInputValueChange,name,id}:
  {value: any,onValueChange?:((value: any, eventDetails?: any,
  ) => void) | undefined;
  dataItems:any[];
onInputValueChange?: ((inputValue: string, eventDetails?: any) => void) | undefined
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined
    name?:string|undefined;id?:string|undefined
})=>{
  return (
    <Combobox 
    items={dataItems}
     value={value}
      onValueChange={onValueChange}
      onInputValueChange={onInputValueChange}
    >
      <ComboboxInput value={dataItems.find((v)=>v.value===value)?.label||""} onChange={onChange} name={name} id={id} className={"bg-white cursor-pointer"} placeholder="Choisir une nationnalié" />
      <ComboboxContent>
        <ComboboxEmpty className={"bg-white cursor-pointer"}>Pas de nationnalié</ComboboxEmpty>
      
        <ComboboxList>
          {(item:Nationalite) => (
            <ComboboxItem key={item.key} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>)
}
//typePieceId
export const TypePieceIDSelectBox=({value,onValueChange,onChange,onInputValueChange,name,id}:
  {value: any,onValueChange?:((value: any, eventDetails?: any,
  ) => void) | undefined;
onInputValueChange?: ((inputValue: string, eventDetails?: any) => void) | undefined
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined
    name?:string|undefined;id?:string|undefined
})=>{
  return (
    <Combobox 
    items={typePieceId}
     value={value}
      onValueChange={onValueChange}
      onInputValueChange={onInputValueChange}
    >
      <ComboboxInput value={typePieceId.find((v)=>v.value===value)?.label||""} onChange={onChange} name={name} id={id} className={"bg-white cursor-pointer"} placeholder="Choisir une nationnalié" />
      <ComboboxContent>
        <ComboboxEmpty className={"bg-white cursor-pointer"}>Pas de nationnalié</ComboboxEmpty>
      
        <ComboboxList>
          {(item:Nationalite) => (
            <ComboboxItem key={item.key} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
          
        </ComboboxList>
      </ComboboxContent>
    </Combobox>)
}
export const NationaliteSelectBox=({value,onValueChange,onChange,onInputValueChange,name,id}:
  {value: any,onValueChange?:((value: any, eventDetails?: any,
  ) => void) | undefined;
onInputValueChange?: ((inputValue: string, eventDetails?: any) => void) | undefined
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined
    name?:string|undefined;id?:string|undefined
})=>{
  return (
    <Combobox 
    
    items={nationalities}
     value={value}
      onValueChange={onValueChange}
      onInputValueChange={onInputValueChange}
    >
      <ComboboxInput  value={nationalities.find((v)=>v.value===value)?.label||""} onChange={onChange} name={name} id={id} className={"bg-white cursor-pointer"} placeholder="Choisir une nationnalié" />
      <ComboboxContent aria-autocomplete="both" >
        <ComboboxEmpty className={"bg-white "}>Pas de nationnalié</ComboboxEmpty>
      
        <ComboboxList>
          {(item:Nationalite) => (
            <ComboboxItem key={item.key} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
          
        </ComboboxList>
      </ComboboxContent>
    </Combobox>)
}

export const DatePicker=({selected,onSelect,name,id,onChangeValue}:{selected:any,onSelect?:(v:any)=>void,name?:string;id?:string,onChangeValue?:ChangeEventHandler<HTMLInputElement, HTMLInputElement> | undefined})=>{
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!selected}
          className="w-[280] justify-start text-left font-normal data-[empty=true]:text-muted-foreground bg-white"
        >
          <CalendarIcon />
          {!isNaN(new Date(selected).getDate()) ? new Date(selected).toISOString()?.split("T")[0].replaceAll("-","/") : <span>Choisir une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar 
        mode="single"
        animate={true}
         selected={selected}
          onSelect={onSelect}
          //today={new Date()}
           />
        {/*  <input hidden name={name} id={id} value={selected} onChange={onChangeValue} /> */}
      </PopoverContent>
    </Popover>
  )
}

export const CustomPopOver=()=>{
  return<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
}

export const ErrorField=({errorField}:{errorField?:any})=> errorField?<span className="text-red-500 text-sm p-0 m-0">{errorField}</span>:<></>

export const FormContainer=({children}:{children:ReactNode})=>{
return<div className="w-[95%] sm:w-[85%] bg-[#0a10919a] backdrop-opacity-35 backdrop-blur-sm shadow-lg p-4 items-center justify-center h-fit">{children}</div>
}