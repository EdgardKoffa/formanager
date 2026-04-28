import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import React from "react";
import { mainCardClassNames } from "../functions/utils";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function CustomAlertDialog({open,onOpenChange,content_size,children,cancel_btn,action_btn,title,content_className}:
    {open: boolean;onOpenChange?(open: boolean): void,content_size?: "default" | "sm" | undefined;children?:React.ReactNode,cancel_btn?:string|React.ReactElement,action_btn?:string|React.ReactElement,title?:string|React.ReactElement;content_className?: string | undefined}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent 
      
      className={mainCardClassNames+" "+content_className?content_className:""} size={content_size}>
        <AlertDialogHeader >
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {(cancel_btn||action_btn)&&<AlertDialogFooter>
         { cancel_btn&&<AlertDialogCancel>{cancel_btn}</AlertDialogCancel>}
          {action_btn&&<AlertDialogAction>{action_btn}</AlertDialogAction>}
        </AlertDialogFooter>}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function CustomModalDialog({open,onOpenChange,content_size,children,cancel_btn,action_btn,title,content_className,showCloseButton,style}:
    {open: boolean;onOpenChange?(open: boolean): void,content_size?: "default" | "sm" | undefined;children?:React.ReactNode,cancel_btn?:string|React.ReactElement,action_btn?:string|React.ReactElement,title?:string|React.ReactElement;content_className?: string | undefined;
        showCloseButton?: boolean | undefined
        style?: React.CSSProperties | undefined
    }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
      
      aria-description="Custum dialog" 
      showCloseButton={showCloseButton}
      style={style}
      className={mainCardClassNames+"overflow-auto "+(content_className?content_className:"")} 
      >
        <DialogHeader >
          <DialogTitle>{title}</DialogTitle>
          <div className="w-full">
            {children}
          </div>
        </DialogHeader>
        {(cancel_btn||action_btn)&&
        <div className="flex sm:flex-row flex-col w-full gap-10 items-center
         justify-center sm:justify-start sm:items-center  ">
         { cancel_btn&&<>{cancel_btn}</>}
          {action_btn&&<>{action_btn}</>}
        </div>}
      </DialogContent>
    </Dialog>
  )
}
