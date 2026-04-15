export default function EditClinicLoading() {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
            </div>

            {/* Form Skeleton */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-3 w-20 bg-gray-100 rounded"></div>
                        <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 w-20 bg-gray-100 rounded"></div>
                        <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-100 rounded"></div>
                    <div className="h-32 bg-gray-100 rounded-lg w-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                    <div className="h-40 bg-gray-100 rounded-lg w-full"></div>
                </div>

                <div className="flex justify-between pt-6">
                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                    <div className="h-12 w-40 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
