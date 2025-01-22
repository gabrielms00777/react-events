import { errorStore } from "../store/errorStore"

export const ErrorAlert = () => {
    const { errors, clearErrors } = errorStore()

    if (!errors) return null

    return (
        <div className="fixed top-5 right-5 max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
            <div className="flex justify-between items-center">
                <strong className="font-bold">Erro(s) encontrado(s):</strong>
                <button onClick={clearErrors} className="text-red-700 font-bold">X</button>
            </div>
            <ul className="mt-2">
                {Object.entries(errors).map(([field, messages]) => (
                    <li key={field}>
                        <strong className="capitalize">{field}:</strong> {messages.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    )
}