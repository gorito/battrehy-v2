import { createClient } from './server';
import { randomUUID } from 'crypto';

/**
 * Downloads an image from an external URL and uploads it to Supabase Storage.
 * Returns the public URL of the uploaded image, or the original URL if it fails or isn't external.
 */
export async function importExternalImage(url: string, folder: string = 'clinics'): Promise<string> {
    if (!url) return url;
    
    // If it's already a Supabase URL, don't re-import
    if (url.includes('supabase.co/storage/v1/object/public/')) {
        return url;
    }

    // Only import external HTTP(S) URLs
    if (!url.startsWith('http')) {
        return url;
    }

    try {
        const supabase = await createClient();
        const bucketName = 'company-images';

        // Fetch the image
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            console.warn(`[Storage] Failed to fetch external image: ${url} (Status: ${response.status})`);
            return url;
        }

        const blob = await response.blob();
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        
        // Determine file extension
        let ext = 'jpg';
        if (contentType.includes('png')) ext = 'png';
        else if (contentType.includes('webp')) ext = 'webp';
        else if (contentType.includes('gif')) ext = 'gif';
        
        // If the URL has an extension, try to use it
        const urlExt = url.split('.').pop()?.split(/[?#]/)[0];
        if (urlExt && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(urlExt.toLowerCase())) {
            ext = urlExt.toLowerCase();
        }

        const fileName = `${randomUUID()}.${ext}`;
        const filePath = folder ? `${folder}/${fileName}` : fileName;

        // Upload to Supabase Storage
        const { data, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, blob, {
                contentType,
                upsert: true
            });

        if (uploadError) {
            console.error(`[Storage] Upload error for ${url}:`, uploadError);
            return url;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        console.log(`[Storage] Successfully imported ${url} to ${publicUrl}`);
        return publicUrl;

    } catch (error) {
        console.error(`[Storage] Unexpected error importing ${url}:`, error);
        return url;
    }
}
