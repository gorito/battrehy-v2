'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    defaultValue?: string;
    name: string;
    label: string;
    bucketName?: string;
    folder?: string;
}

export default function ImageUpload({ defaultValue, name, label, bucketName = 'company-images', folder = '' }: ImageUploadProps) {
    const [currentUrl, setCurrentUrl] = useState(defaultValue || '');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Filen måste vara en bild.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('Bilden får vara max 5MB.');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            // Create a unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = folder ? `${folder}/${fileName}` : fileName;

            // Upload to Supabase Storage
            const { error: uploadError, data } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error details:", uploadError);
                throw new Error('Kunde inte ladda upp bilden. Kontrollera att lagringshinken ("' + bucketName + '") är skapad och publik.');
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            setCurrentUrl(publicUrl);
        } catch (err: any) {
            console.error('Upload error:', err);
            setError(err.message || 'Ett fel uppstod vid uppladdning.');
        } finally {
            setIsUploading(false);
            // reset file input
            e.target.value = '';
        }
    };

    const handleRemove = () => {
        setCurrentUrl('');
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            {error && <p className="text-red-500 text-sm py-1 font-medium">{error}</p>}

            {currentUrl ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-video max-w-sm group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={currentUrl} alt="Uppladdad bild" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        title="Ta bort bild"
                    >
                        <X size={18} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1.5 truncate">
                        {currentUrl}
                    </div>
                </div>
            ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative max-w-sm flex items-center justify-center flex-col gap-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />

                    {isUploading ? (
                        <>
                            <Loader2 size={24} className="text-primary animate-spin" />
                            <span className="text-sm text-gray-500 font-medium">Laddar upp...</span>
                        </>
                    ) : (
                        <>
                            <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center">
                                <Upload size={20} className="text-gray-400" />
                            </div>
                            <div className="text-center">
                                <span className="text-primary font-medium hover:underline text-sm">Välj en bild</span>
                                <span className="text-gray-500 text-sm ml-1">eller dra och släpp</span>
                            </div>
                            <p className="text-xs text-gray-400">PNG, JPG upp till 5MB</p>
                        </>
                    )}
                </div>
            )}

            {/* Hidden input to ensure the value gets submitted with the form */}
            <input type="hidden" name={name} value={currentUrl || ''} />
        </div>
    );
}
