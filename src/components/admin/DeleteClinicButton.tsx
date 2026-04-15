'use client';

import { Trash2 } from 'lucide-react';
import { deleteClinicAction } from '@/lib/supabase/actions/mutations';

interface DeleteClinicButtonProps {
    id: string;
    clinicName: string;
}

export default function DeleteClinicButton({ id, clinicName }: DeleteClinicButtonProps) {
    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!window.confirm(`Är du säker på att du vill ta bort kliniken "${clinicName}"?\n\nDetta går inte att ångra och raderar även alla kopplade bilder och behandlingar.`)) {
            e.preventDefault();
        }
    };

    return (
        <form action={deleteClinicAction} onSubmit={handleDelete}>
            <input type="hidden" name="id" value={id} />
            <button 
                type="submit" 
                className="p-2 text-gray-400 hover:text-red-500 hover:cursor-pointer transition-colors"
                title="Ta bort klinik"
            >
                <Trash2 size={18} />
            </button>
        </form>
    );
}
