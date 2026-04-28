import { z } from "zod"
export const moduleSchema = z.object({
  id: z.uuid({version:"v4"}).optional().nullable(),
  title: z.string("Le nom de module de formation est obligatoire.").max(100),
  code_module: z.string({error:"Former le code du module par une initiale a 2 lettres"}).max(2,"Maximum 2 lettres").min(2,"Minimum 2 lettres"),
  description: z.string().nullable(),
  price: z.string({error:"Ce champ est obligatoire et doit contenir que des chiffres"}).regex(/^\d+(\.\d{1,2})?$/), // numeric(10,2)
});
export const vagueFormationSchema = z.object({
  id: z.uuid({version:"v4"}).optional(),
  title: z.string().max(100),
  description: z.string().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  duree: z.string().max(50).nullable(),
});