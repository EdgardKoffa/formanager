//declare module 'pdfkit';

type RegisterSlugs="user"|"inscription"|"employer"
type Nationalite={
    "key": string,
    "value": string,
    "label": string
  }
   type Student = {
  id: string
  userId?: string
  firstName: string
  lastName: string
  phone: string
  address?: string
  personne_a_contacter?: string
  createdAt?: Date
  email: string
  genre?: "M" | "F"
  date_de_naissance?: Date
  lieu_de_naissance?: string
  nationalite?: string
  niveau_etude?: string
  modulesId?: string
  date_inscription?: Date
  piece_id_number?: string
  piece_id_type?: string
  autre_piece_id?: string
  photo_id?: string
  numero_matricule?:string
}
 type VagueFormation = {
  id: string;              // uuid
  title: string;           // varchar(100), not null
  description: string | null; // text, nullable
  startDate: Date | null;  // timestamp, nullable
  endDate: Date | null;    // timestamp, nullable
  duree: string | null;    // varchar(50), nullable
 }
type SelectBoxType={
    key:string
    value:string|Date|number|any
    label:string
}
 type ModuleFormation = {
  id?: string|null;              // uuid
  title: string;           // varchar(100), not null
  code_module: string;     // varchar(100), not null
  description: string | null; // text, nullable
  price: string;           // numeric(10,2), not null (Drizzle renvoie string pour numeric)
};

type ModuleFormationAction=ModuleFormation&{
    action:any
}

type NavMenuItemType={
    label:string
    url?:string
    icon?: JSX.Element | undefined
    submenu?:any|undefined
    title?:string
    iconPosition?:"right"|"left"
    isActive?:boolean
}

type DropDownItemsDataItem={
    itemLabel:string
    url?:string
     icon?: JSX.Element
}