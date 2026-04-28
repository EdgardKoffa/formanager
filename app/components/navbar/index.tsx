
import {auth} from '@/app/api/auth/auth'
import { UserDropDown } from '@/app/components/user.dopdown';
import { HomeIcon, UsersIcon, UsersRoundIcon, ChevronDown } from 'lucide-react';
import { redirect } from 'next/navigation';
 
import { NavMenus } from '@/app/components/nav.menu';

export default async function Navbar() {
 const session = await auth()

 const menuItems:NavMenuItemType[]=[
    {label:'Accueil',url:'/',icon:<HomeIcon/>,iconPosition:"left"},
    {label:'Formation',iconPosition:"right",icon:<ChevronDown size={12}/>,
        submenu:
        [{label:'Inscription',url:'/register/inscription',icon:<HomeIcon/>},
        {label:'Frais de formation',url:'/formation/payer',icon:<HomeIcon/>},
    ]},
    {label:'Employés',iconPosition:"right",icon:<ChevronDown size={12}/>,
        submenu:
        [{label:'Inscription',url:'/registre/inscription',icon:<HomeIcon/>},
        {label:'Frais de formation',url:'/formation/payer',icon:<HomeIcon/>},
    ]},
    {label:'Services',url:'/service',icon:<HomeIcon/>,iconPosition:"left"},
]
const dropDownItems:DropDownItemsDataItem[]=[
  {
    itemLabel:"Modules de formation",
    icon:<></>,
    url:"/settings/modules?action=add"
  },
  {
    itemLabel:"Liste des modules",
    icon:<></>,
    url:"/settings/modules?action=view"
  }
]
//console.log("session",session)
  if (!session?.user) return redirect("/login")

  return (
    <nav className=" text-white p-4 shadow-lg shadow-gray-900 flex items-center justify-between opacity-100">
      {/* logo */}
      <div className='flex space-x-2.5'>

     <h1 className="text-xl items-center font-bold">Mon Application</h1>
      </div>
      {/* menus */}
     <div style={{marginLeft:"50px"}} 
     className='flex flex-1 border-0 items-center space-x-4 justify-start  px-3'>
      <div className='flex flex-1'>
      <NavMenus menuItems={menuItems}/>
</div>
      <div className='flex items-center justify-end'>
       {session.user&& <div className='w-fit'>
        <UserDropDown 
          session={session}
          data={dropDownItems}
          />
        </div>}
      </div>
     </div>
    </nav>
  );
}