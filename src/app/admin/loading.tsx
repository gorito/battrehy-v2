export default function AdminLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-rose-100 rounded-full"></div>
                <div className="w-12 h-12 border-4 border-primary rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-gray-500 font-medium animate-pulse">Laddar adminpanelen...</p>
        </div>
    );
}
