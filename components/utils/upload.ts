import { createClient } from '@/utils/supabase/client'

export async function uploadFile(
  file: File,
  bucket: string,
  userId: string
): Promise<string | null> {
  const supabase = createClient()
  
  // Generer unikt filnavn
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  // Hent offentlig URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)

  return publicUrl
}