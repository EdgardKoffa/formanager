import { get } from "http";
import z from "zod";

// Nouvelle méthode recommandée
export const getZodErrorMessage=(error: z.ZodError)=>{
    return z.treeifyError(error)
}

