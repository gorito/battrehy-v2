import { getContactSubmissions } from '@/lib/supabase/actions/queries';
import ContactMessagesClient from '@/components/admin/ContactMessagesClient';

export const dynamic = 'force-dynamic';

export default async function AdminContactPage() {
    const submissions = await getContactSubmissions();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Kontaktmeddelanden</h1>
                <p className="text-gray-500">Hantera och svara på meddelanden som skickats via kontaktformuläret.</p>
            </div>

            <ContactMessagesClient initialSubmissions={submissions} />
        </div>
    );
}
