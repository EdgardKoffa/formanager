"use server"
import { writeFile, mkdir,access, constants} from 'fs/promises';
import path from 'path';
export async function uploadFile(file:File,nomFichier:string,parentDir:string) {
  //const file = formData.get('file') as File;

  if (!file) {
    return { success: false, error: 'Aucun fichier choisi!' };
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: 'Type de fichier invalide!' };
  }

  // Validate file size (5MB limit)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { success: false, error: 'Taille du fichier trop grand (max 5MB)' };
  }

  try {
    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
const currentYear=new Date().getFullYear()
    // Create unique filename
    const prefix=`${new Date().getMonth()+1}`.padStart(2,"0")
    const uniqueName = `${prefix}-${nomFichier.replace(/\s/g, '-')}.${file.type.split("/")[1]}`;
   
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads',parentDir,`${currentYear}`);
    // await access(uploadDir,constants.F_OK)
    await mkdir(uploadDir, { recursive: true });
    // Write file to disk
    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);
//console.log("filePath",filePath)
    return {
      success: true,
      url:`/uploads/${parentDir}/${currentYear}/${uniqueName}`,
      filename: uniqueName,
      size: file.size,
    };
  } catch (error:any) {
    console.error('Upload error:', error);
    return { success: false, error: 'Erreur de chargement du fichier. cause: '+error?.message };
  }
}