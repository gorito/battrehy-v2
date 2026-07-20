'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { importExternalImage } from '../storage';
import { getCorrectedCity } from '@/lib/cityFixes';
import { slugifyCity } from '@/lib/utils';
import nodemailer from 'nodemailer';

export async function createClinicAction(formData: FormData) {
    const supabase = await createClient();
    // Extract form values
    const name = (formData.get('name') as string)?.trim();
    const city = (formData.get('city') as string)?.trim();
  const correctedCity = getCorrectedCity(name, city);
    const address = (formData.get('address') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const website = (formData.get('website') as string)?.trim();
    const booking_url = (formData.get('booking_url') as string)?.trim();
    const description = (formData.get('description') as string)?.trim();
    const primary_image_url = (formData.get('primary_image_url') as string)?.trim();
    const is_shr_member = formData.get('is_shr_member') === 'on';
    const is_rfem_member = formData.get('is_rfem_member') === 'on';
    const neighborhood = (formData.get('neighborhood') as string)?.trim() || null;

    // Create slug from name
    const slug = name.toLowerCase().trim().replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-');

    const { data, error } = await supabase
        .from('clinics')
        .insert([{
            name,
            slug,
            city: correctedCity,
            address,
            phone,
            website,
            booking_url,
            description,
            primary_image_url: primary_image_url ? await importExternalImage(primary_image_url) : null,
            tier: 'free',
            is_verified: false,
            is_shr_member,
            is_rfem_member,
            neighborhood
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

    // Handle manual treatments
    const treatment_ids = formData.getAll('treatment_ids') as string[];
    if (treatment_ids && treatment_ids.length > 0) {
        const clinicTreatments = treatment_ids.map(t_id => ({
            clinic_id: data.id,
            treatment_id: t_id
        }));
        const { error: treatmentError } = await supabase.from('clinic_treatments').insert(clinicTreatments);
        if (treatmentError) {
            console.error('Error inserting manual treatments:', treatmentError);
        }
    }

    // Revalidate the admin index to show the new clinic
    revalidatePath('/admin/kliniker');

    const { redirect } = await import('next/navigation');
    redirect('/admin/kliniker');
}

export async function updateTreatmentAction(formData: FormData) {
    const supabase = await createClient();
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
    const supabase = await createClient();
    const id = formData.get('id') as string;
    const rawSlug = formData.get('slug') as string;
    const cleanSlug = rawSlug ? rawSlug.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-') : '';

    const name = (formData.get('name') as string)?.trim();
    const city = (formData.get('city') as string)?.trim();
  const correctedCity = getCorrectedCity(name, city);
    const address = (formData.get('address') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const website = (formData.get('website') as string)?.trim();
    const booking_url = (formData.get('booking_url') as string)?.trim();
    const description = (formData.get('description') as string)?.trim();
    const ai_description = (formData.get('ai_description') as string)?.trim() || null;
    const ai_faq = (formData.get('ai_faq') as string)?.trim() || null;
    const ai_meta = (formData.get('ai_meta') as string)?.trim() || null;
    const primary_image_url = (formData.get('primary_image_url') as string)?.trim();
    const recoRatingRaw = (formData.get('reco_rating') as string)?.trim();
    const parsedRating = recoRatingRaw ? parseFloat(recoRatingRaw) : NaN;
    const reco_rating = !isNaN(parsedRating) ? parsedRating : null;

    const recoReviewCountRaw = (formData.get('reco_review_count') as string)?.trim();
    const parsedCount = recoReviewCountRaw ? parseInt(recoReviewCountRaw, 10) : NaN;
    const reco_review_count = !isNaN(parsedCount) ? parsedCount : null;

    const reco_url = (formData.get('reco_url') as string)?.trim() || null;
    const neighborhood = (formData.get('neighborhood') as string)?.trim() || null;
    const is_verified = formData.get('is_verified') === 'on';
    const is_shr_member = formData.get('is_shr_member') === 'on';
    const is_rfem_member = formData.get('is_rfem_member') === 'on';
    const tier = formData.get('tier') as string;

    const { error } = await supabase
        .from('clinics')
        .update({
            name,
            slug: cleanSlug,
            city: correctedCity,
            address,
            phone,
            website,
            booking_url,
            description,
            ai_description,
            ai_faq,
            ai_meta,
            primary_image_url: primary_image_url ? await importExternalImage(primary_image_url) : null,
            is_verified,
            is_shr_member,
            is_rfem_member,
            tier,
            reco_rating,
            reco_review_count,
            reco_url,
            neighborhood,
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
                    url: await importExternalImage(imgUrl.trim()),
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

    // Handle manual treatments
    const treatment_ids = formData.getAll('treatment_ids') as string[];
    // First wipe existing treatments
    await supabase.from('clinic_treatments').delete().eq('clinic_id', id);
    // Then insert new ones if any
    if (treatment_ids && treatment_ids.length > 0) {
        const clinicTreatments = treatment_ids.map(t_id => ({
            clinic_id: id,
            treatment_id: t_id
        }));
        const { error: treatmentError } = await supabase.from('clinic_treatments').insert(clinicTreatments);
        if (treatmentError) {
            console.error('Error updating manual treatments:', treatmentError);
        }
    }

    revalidatePath('/admin/kliniker');
    revalidatePath(`/kliniker/${slugifyCity(correctedCity)}/${cleanSlug}`);

    return { success: true, newSlug: cleanSlug };
}

export async function deleteClinicAction(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get('id') as string;

    if (!id) return { success: false, error: 'Klinik-ID saknas' };

    console.log(`[Admin] Attempting to delete clinic: ${id}`);

    const { error } = await supabase
        .from('clinics')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting clinic:', {
            id,
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
        });
        return { success: false, error: error.message };
    }

    console.log(`[Admin] Successfully deleted clinic: ${id}`);

    revalidatePath('/admin/kliniker');
    return { success: true };
}

export async function updateCityAction(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const { error } = await supabase
        .from('cities')
        .update({
            name,
            description: description || null
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating city:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/stader');
    // Also revalidate the public city page
    const slug = name.toLowerCase().replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[^a-z0-9]+/g, '-');
    revalidatePath(`/kliniker/${slug}`);

    const { redirect } = await import('next/navigation');
    redirect('/admin/stader');
}

export async function updateClinicSalesInfoAction(id: string, data: { email?: string, phone?: string, contact_name?: string, sales_status?: string, sales_notes?: string }) {
    const supabase = await createClient();
    
    // We only update the keys that are provided
    const { error } = await supabase
        .from('clinics')
        .update(data)
        .eq('id', id);

    if (error) {
        console.error('Error updating sales info:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/forsaljning');
    return { success: true };
}

export async function toggleGBPChecklistItemAction(clinicId: string, itemId: string, completed: boolean) {
    const supabase = await createClient();
    
    // Check if the record already exists
    const { data: existing, error: selectError } = await supabase
        .from('clinic_gbp_checklist')
        .select('id')
        .eq('clinic_id', clinicId)
        .eq('item_id', itemId)
        .maybeSingle();

    if (selectError) {
        console.error('Error checking GBP checklist item:', selectError);
        return { success: false, error: selectError.message };
    }

    if (existing) {
        // Update existing item
        const { error: updateError } = await supabase
            .from('clinic_gbp_checklist')
            .update({ completed, updated_at: new Date().toISOString() })
            .eq('id', existing.id);

        if (updateError) {
            console.error('Error updating GBP checklist item:', updateError);
            return { success: false, error: updateError.message };
        }
    } else {
        // Insert new checklist item
        const { error: insertError } = await supabase
            .from('clinic_gbp_checklist')
            .insert([{
                clinic_id: clinicId,
                item_id: itemId,
                completed
            }]);

        if (insertError) {
            console.error('Error inserting GBP checklist item:', insertError);
            return { success: false, error: insertError.message };
        }
    }

    return { success: true };
}

export async function submitContactFormAction(data: { name: string; email: string; subject: string; message: string }) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

    if (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error: error.message };
    }

    // Send email notification via SMTP (Loopia) if configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'mailcluster.loopia.se',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            const escapeHtml = (unsafe: string) => {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            };

            await transporter.sendMail({
                from: `"Bättrehy Kontakt" <${process.env.SMTP_USER}>`,
                to: 'info@battrehy.se',
                replyTo: data.email,
                subject: `Nytt meddelande: ${data.subject}`,
                text: `Nytt meddelande från ${data.name} (${data.email}):\n\nÄrende: ${data.subject}\n\nMeddelande:\n${data.message}`,
                html: `
                    <h2>Nytt kontaktmeddelande från Bättrehy.se</h2>
                    <p><strong>Namn:</strong> ${escapeHtml(data.name)}</p>
                    <p><strong>E-post:</strong> ${escapeHtml(data.email)}</p>
                    <p><strong>Ärende:</strong> ${escapeHtml(data.subject)}</p>
                    <p><strong>Meddelande:</strong></p>
                    <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">${escapeHtml(data.message)}</p>
                `
            });
        } catch (emailErr) {
            console.error('Failed to send email via SMTP:', emailErr);
        }
    }

    return { success: true };
}

export async function updateContactSubmissionStatusAction(id: string, status: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating contact submission status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/kontakt');
    return { success: true };
}


