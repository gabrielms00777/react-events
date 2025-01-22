import { loadingStore } from "../store/loadingStore"

export const LoadingOverlay = () => {
    const isLoading = loadingStore((state) => state.isLoading)

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                <p className="mt-4 text-gray-700 text-lg font-semibold">Carregando...</p>
            </div>
        </div>
    )
}