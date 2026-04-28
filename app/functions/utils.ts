import { nationalities } from "./nationalities";

export const initialState = {
  isSuccess:false,
  message: '',
  redirectTo: "#"
}

export const loginTop_bg_color="#0a10919a"
export const mainCardClassNames="w-[95%] sm:w-[85%] bg-[#0a10919a] backdrop-opacity-35 backdrop-blur-sm  shadow-lg p-4"

//export const modules_formation=[]
export const niveau_etudes= [
  { key: "primaire", value: "PRIMAIRE", label: "École primaire" },
  { key: "college", value: "COLLEGE", label: "Collège" },
  { key: "lycee", value: "LYCEE", label: "Lycée" },
  { key: "bac", value: "BAC", label: "Baccalauréat" },
  { key: "bts", value: "BTS", label: "Brevet de Technicien Supérieur" },
  { key: "dut", value: "DUT", label: "Diplôme Universitaire de Technologie" },
  { key: "licence", value: "LICENCE", label: "Licence (Bac+3)" },
  { key: "master", value: "MASTER", label: "Master (Bac+5)" },
  { key: "ingenieur", value: "INGENIEUR", label: "Cycle Ingénieur" },
  { key: "doctorat", value: "DOCTORAT", label: "Doctorat (Bac+8)" },
  { key: "autre", value: "AUTRE", label: "Autre / Formation professionnelle" },
];
export const posts=[]

export const typePieceId=[
  { "key": "CNI", "value": "cni", "label": "Carte Nationale d'Identité" },
  { "key": "PASSPORT", "value": "passport", "label": "Passeport" },
  { "key": "PERMIS", "value": "permis", "label": "Permis de Conduire" },
  { "key": "CARTE_SEJOUR", "value": "carte_sejour", "label": "Carte de Séjour" },
  { "key": "ACTE_NAISSANCE", "value": "acte_naissance", "label": "Extrait d'Acte de Naissance" },
  { "key": "CARTE_ELECTEUR", "value": "carte_electeur", "label": "Carte d'Électeur" },
  { "key": "AUTRE", "value": "autre", "label": "Autre" }
].map((item)=>({
    ...item,
    value:item.value.toUpperCase(),
    label:item.label.toUpperCase()

}))
export const getTypePieceIdLabel=(value:string)=>{
    const item=typePieceId.find((item)=>item.value.toLowerCase()===value.toLowerCase())
    return item?.label?item.label:""
}

export const getNationaliteLabel=(value:string)=>{
    const item=nationalities.find((item)=>item.value.toLowerCase()===value.toLowerCase())
    return item?.label?item.label:""
}
export const getSelectBoxLabel=(items:{
    key: string;
    value: string;
    label: string;
}[],value:string)=>{
    const item=typePieceId.find((item)=>item.value.toLowerCase()===value.toLowerCase())
    return item?.label?item.label:""
}
//export const
