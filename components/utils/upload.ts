import { createClient } from '@/utils/supabase/client'

export async function uploadFile(
  file: File,
  bucket: string,
  userId: string
): Promise<string | null> {
  const supabase = createClient()
  
  try {
    // Sjekk at filen er gyldig
    if (!file.type.startsWith('image/')) {
      console.error('File is not an image')
      return null
    }

    // Generer unikt filnavn
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    console.log(`Uploading to ${bucket}/${fileName}...`)

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      
      // Hvis feilen er at mappen ikke finnes, prøv å opprett den
      if (uploadError.message.includes('bucket')) {
        console.error('Bucket does not exist. Create it in Supabase Storage first.')
      }
      
      return null
    }

    // Hent offentlig URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    console.log('Upload successful:', publicUrl)
    return publicUrl

  } catch (error) {
    console.error('Unexpected error:', error)
    return null
  }
}