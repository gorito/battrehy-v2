'use client';
 
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { deleteClinicAction } from '@/lib/supabase/actions/mutations';
import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteClinicButtonProps {
    id: string;
    clinicName: string;
    variant?: 'icon' | 'button';
    redirectOnDelete?: boolean;
}

export default function DeleteClinicButton({ 
    id, 
    clinicName, 
    variant = 'icon',
    redirectOnDelete = false 
}: DeleteClinicButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('id', id);
            
            const result = await deleteClinicAction(formData);
            
            if (result.success) {
                setShowConfirm(false);
                if (redirectOnDelete) {
                    router.push('/admin/kliniker');
                }
            } else {
                alert(`Ett fel uppstod vid borttagning: ${result.error}`);
                setShowConfirm(false);
            }
        });
    };

    const cancelDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(false);
    };

    const buttonContent = variant === 'button' ? (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
        >
            <Trash2 size={18} />
            {isPending ? 'Tar bort...' : 'Ta bort klinik'}
        </button>
    ) : (
        <button 
            type="button" 
            onClick={handleDelete}
            disabled={isPending}
            className={`p-2 transition-colors ${isPending ? 'text-gray-300' : 'text-gray-400 hover:text-red-500 hover:cursor-pointer'}`}
            title="Ta bort klinik"
        >
            <Trash2 size={18} className={isPending ? 'animate-pulse' : ''} />
        </button>
    );

    return (
        <>
            {buttonContent}

            {/* Custom Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-100 rounded-full text-red-600">
                                    <AlertTriangle size={24} />
                                </div>
                                <button 
                                    onClick={cancelDelete}
                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ta bort klinik?</h3>
                            <p className="text-gray-600 mb-6">
                                Är du helt säker på att du vill ta bort <span className="font-bold text-gray-900">"{clinicName}"</span>? 
                                <br /><br />
                                Detta raderar även alla kopplade bilder och behandlingar permanent. Det går inte att ångra.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={cancelDelete}
                                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Avbryt
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isPending}
                                    className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                                >
                                    {isPending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Tar bort...
                                        </>
                                    ) : (
                                        'Ja, ta bort permanent'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

