import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-auto">
                <div className="p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
