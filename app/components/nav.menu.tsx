'use client'

import { HomeIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { NavBarMenuiSubtemBtn, NavBarMenuitemBtn } from "./utils";
import { cva } from "class-variance-authority";
import { Button } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const customnavigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex h-9 w-[200] items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-blue-800 focus:bg-blue-800 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted hover:text-black"
)
export const NavMenus = ({menuItems}:{menuItems:NavMenuItemType[]}) => {
  const [currentPage,setCurrentPage]=useState(0)
   const [open,setOpen]=useState(false)
    
    return (
   <menu 
   style={{
    zIndex:99999
   }}
   onClick={()=>{}}
   className="flex p-2 bg-transparent gap-4 ">
    {menuItems.map((item,index)=>{
        if(item.submenu){

            return<li onClick={()=>{
                setCurrentPage(index)
                setOpen(prev=>currentPage===index?!prev:true)
            }} 
            style={{
                backgroundColor:currentPage===index?"#cefafe":"",
                color:currentPage===index?"#1c398e":""
            }}
            className={cn(
                "relative groupe active:bg-cyan-100 shadow-2xl shadow-blue-50 rounded-lg active:text-blue-900 active:font-bold hover:bg-blue-600 hover:text-shadow-yellow-50 hover:text-black"
            )} key={index}>
                 {/* <NavBarMenuitemBtn url={item.url} icon={item.icon} label={item.label as any} iconPosition={item.iconPosition}  /> */}
                <Button 
                className={`flex flex-row gap-2 px-3 py-2 border-0 text-[18px]  items-center`}
                >{item.label as any}{item.icon}
                </Button>
               
               <SumbMenuItem
               currentPage={currentPage}
               index={index}
               item={item}
               open={open}
               setOpen={setOpen}
               />
            </li>
        }
        return <li 
         style={{
                backgroundColor:currentPage===index?"#cefafe":"",
                color:currentPage===index?"#1c398e":""
            }}
        className={cn(
                "relative groupe active:bg-cyan-100 shadow-2xl shadow-blue-50 rounded-lg active:text-blue-900 active:font-bold hover:bg-blue-600 hover:text-shadow-yellow-50 hover:text-black"
            )} key={index}>
            <NavBarMenuitemBtn 
            onClick={()=>setCurrentPage(index)} url={item.url} icon={item.icon} label={item.label as any} iconPosition={item.iconPosition}  />
        </li> 
    })}
   </menu>
   
  );
};

function SumbMenuItem({ item, setOpen,open,currentPage,index }:
    {item:NavMenuItemType
    setOpen:(b:boolean)=>void
    open:boolean
    currentPage:number
    index:number
}) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event:any) {
      if (ref.current && !(ref?.current as any)?.contains(event.target)) {
        setOpen(false); // fermer uniquement cette carte
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [item.label, setOpen]);

  return (
    <div 
    //ref={ref} 
                style={{
                    display:(open&&currentPage===index)?"block":"none",
                    background:"#dbeafe",
                    opacity:1
                }}
                
                className="bg-blue-100 opacity-100 ">
                <ul 
                style={{
                    background:"#dbeafe",
                    opacity:1,
                    borderRadius:5,
                    paddingTop:20,
                    minWidth:200,
                    width:"fit-content"
                }}
                className="grid  w-[250] absolute group-hover:block group-active:grid min-w-min max-w-max grid-cols-1 p-1.5  overflow-hidden bg-blue-50 opacity-100 my-1.5">
                    {item.submenu?.map((subItem:any,sIndx:number)=>{
                        return <li className="bg-cyan-100 my-1 " key={sIndx}>
            <NavBarMenuiSubtemBtn url={subItem.url} icon={subItem.icon} label={subItem.label as any}  />
        </li> 
                    })}
                </ul>
            </div>
  );
}
/*  <NavigationMenu className='w-full'>
         <NavigationMenuItem> {label:'Accueil',url:'/',icon:<HomeIcon/>}
      <NavigationMenuLink asChild className={ navigationMenuTriggerStyle()}>
        <NavBarMenuitemBtn  label=   />
      </NavigationMenuLink>
      </NavigationMenuItem>
  <NavigationMenuList className='flex space-x-5'>
      <NavigationMenuItem>
      <NavigationMenuTrigger >Employés</NavigationMenuTrigger>
      <NavigationMenuContent >
        <NavigationMenuLink  asChild className={ navigationMenuTriggerStyle()} >
          <NavBarMenuitemBtn url='/register/employer' label='Fiche de registre' icon={<UsersIcon/>}  />
        </NavigationMenuLink>
      </NavigationMenuContent>
      </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className='flex space-x-5'>
      <NavigationMenuItem>
      <NavigationMenuTrigger>Etudiants</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink asChild className={ navigationMenuTriggerStyle()}>
          <NavBarMenuitemBtn url='/register/inscription' label="Fiche d'nscription" icon={<UsersRoundIcon/>}  />
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu> */
