import ShrSyncClient from '@/components/admin/ShrSyncClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Synkronisera SHR-medlemmar | Admin',
};

export default function ShrSyncPage() {
    return <ShrSyncClient />;
}
