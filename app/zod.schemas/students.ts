import { z } from "zod"

export const studentZodSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(8),
  address: z.string().optional(),
  personne_a_contacter: z.string().optional(),
  createdAt: z.date().optional(),
  email: z.string().email(),
  genre: z.enum(["M", "F"]).optional(),
  date_de_naissance: z.date().optional(),
  lieu_de_naissance: z.string().optional(),
  nationalite: z.string().optional(),
  niveau_etude: z.string().optional(),
  specialite: z.string().optional(),
  date_inscription: z.date().optional(),
  piece_id_number: z.string().optional(),
  piece_id_type: z.string().optional(),
  autre_piece_id: z.string().optional(),
  photo_id: z.string().optional(),
  numero_matricule:z.string().optional()
})
export const studentZodSchema1 = z.object({
  firstName: z.string({error:"Nom est requis"}).min(1,"Nom est requis"),
  lastName: z.string({error:"Prenom est rquis"}).min(1,"Prenom est requis"),
  genre: z.enum(["M", "F"],{error:"Le genre est obligatoire"}),//.optional(),
  date_de_naissance: z.date({error:"La date est requise."}),//.optional(),
  lieu_de_naissance: z.string({error:"Le lieu de naissance est requis"}),//.optional(),
  nationalite: z.string({error:"La nationalité est obligatoire."}),//.optional(),
})
export const studentZodSchema2 = z.object({
  phone: z.string({error:"Le numero de telephone est requis"}).min(8,"Le numero de telephone est invalide."),
  address: z.string({error:"Une adresse est obligatoire."}),//.optional(),
  personne_a_contacter: z.string().optional(), 
  email: z.email({error:"Email est invalide."}),
})
export const studentZodSchema3=(isAutrePiece?:boolean)=> z.object({
  
  piece_id_number: z.string({error:"Le N° de pièce est requis"}),//.optional(),
  piece_id_type: z.string({error:"Le type de pièce est obligatoire"}),//.optional(),
  autre_piece_id:isAutrePiece? z.string("Vous devez péciser autre pièce"):z.string().optional(),
  //photo_id: z.string().optional(),
})
export const studentZodSchema4 = z.object({
  
  niveau_etude: z.string({error:"Préciser le niveau d'étude."}),//.optional(),
  modulesId: z.string({error:"Le module de formation est obligatoire."}),//.optional(),
  date_inscription: z.date({error:"Date d'inscription est requise."})//.optional(),
})
// Type dérivé automatiquement
export type Student = z.infer<typeof studentZodSchema>
