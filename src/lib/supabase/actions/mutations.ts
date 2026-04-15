'use server';

import { supabase } from '../client';
import { revalidatePath } from 'next/cache';

export async function createClinicAction(formData: FormData) {
    // Extract form values
    const name = formData.get('name') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const website = formData.get('website') as string;
    const booking_url = formData.get('booking_url') as string;
    const description = formData.get('description') as string;
    const primary_image_url = formData.get('primary_image_url') as string;

    // Create slug from name
    const slug = name.toLowerCase().trim().replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-');

    const { data, error } = await supabase
        .from('clinics')
        .insert([{
            name,
            slug,
            city,
            address,
            phone,
            website,
            booking_url,
            description,
            primary_image_url: primary_image_url || null,
            tier: 'free',
            is_verified: false
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating clinic:', error);
        if (error.code === '23505') {
            return { error: 'En klinik med detta namn finns redan i den valda staden.' };
        }
        return { error: 'Ett databasfel uppstod när kliniken skulle sparas.' };
    }

    // Revalidate the admin index to show the new clinic
    revalidatePath('/admin/kliniker');

    const { redirect } = await import('next/navigation');
    redirect('/admin/kliniker');
}

export async function updateTreatmentAction(formData: FormData) {
    const id = formData.get('id') as string;
    const description = formData.get('description') as string;
    const image_url = formData.get('image_url') as string;

    const { error } = await supabase
        .from('treatments')
        .update({
            description: description || null,
            image_url: image_url || null
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating treatment:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/behandlingar');
    revalidatePath('/');
    revalidatePath(`/behandlingar`);

    const { redirect } = await import('next/navigation');
    redirect('/admin/behandlingar');
}

export async function updateClinicAction(formData: FormData) {
    const id = formData.get('id') as string;
    const slug = formData.get('slug') as string;

    const name = formData.get('name') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const website = formData.get('website') as string;
    const booking_url = formData.get('booking_url') as string;
    const description = formData.get('description') as string;
    const primary_image_url = formData.get('primary_image_url') as string;
    const is_verified = formData.get('is_verified') === 'on';
    const tier = formData.get('tier') as string;

    const { error } = await supabase
        .from('clinics')
        .update({
            name,
            city,
            address,
            phone,
            website,
            booking_url,
            description,
            primary_image_url: primary_image_url || null,
            is_verified,
            tier
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating clinic:', error);
        if (error.code === '23505') {
            return { error: 'En klinik med detta namn finns redan i den valda staden.' };
        }
        return { error: 'Ett databasfel uppstod när kliniken skulle uppdateras.' };
    }

    // Process gallery images for premium/verified tiers
    if (tier !== 'free') {
        const galleryImages = [];
        for (let i = 1; i <= 6; i++) {
            const imgUrl = formData.get(`gallery_image_${i}`) as string;
            if (imgUrl && imgUrl.trim() !== '') {
                galleryImages.push({
                    clinic_id: id,
                    url: imgUrl.trim(),
                    sort_order: i
                });
            }
        }

        // Wipe old images and insert new ones
        await supabase.from('clinic_images').delete().eq('clinic_id', id);

        if (galleryImages.length > 0) {
            const { error: imageError } = await supabase.from('clinic_images').insert(galleryImages);
            if (imageError) {
                console.error('Error updating clinic gallery images:', imageError);
            }
        }
    } else {
        // If downgraded to free, wipe their gallery images
        await supabase.from('clinic_images').delete().eq('clinic_id', id);
    }

    revalidatePath('/admin/kliniker');
    revalidatePath(`/kliniker/${city}/${slug}`);

    const { redirect } = await import('next/navigation');
    redirect('/admin/kliniker');
}

export async function deleteClinicAction(formData: FormData) {
    const id = formData.get('id') as string;

    const { error } = await supabase
        .from('clinics')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting clinic:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/kliniker');
    const { redirect } = await import('next/navigation');
    redirect('/admin/kliniker');
}
