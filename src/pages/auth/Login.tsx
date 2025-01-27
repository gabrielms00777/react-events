import { FormEvent, useState } from "react"
import { loadingStore } from "../../store/loadingStore"
import { api } from "../../lib/axios"
import { errorStore } from "../../store/errorStore"
// import { handleLoginRequest } from "../../services/authService"
import { useNavigate } from "react-router"
import { userStore } from "../../store/userStore"
import { Button } from "@/components/ui/button"

export function Login() {
    const navigate = useNavigate()
    const { showLoading, hideLoading } = loadingStore()
    const setErrors = errorStore((state) => state.setErrors)
    const setUser = userStore((state) => state.setUser)
    // const { setToken, setUser } = userStore()

    const [formData, setFormData] = useState({
        email: 'beer.candace@example.org',
        password: 'password'
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        showLoading()
        try {
            // const success = await handleLoginRequest(formData)
            await api.get('/sanctum/csrf-cookie')
            const response = await api.post('/login', formData)

            if (response.data) {
                setUser(response.data.data)
                if (response.data.data.role === 'admin') {
                    return navigate('/admin')
                } else if (response.data.data.role === 'event_owner') {
                    return navigate('/dashboard')
                }
                return
            }

        } catch (errors: any) {
            setErrors(errors.response.data.errors as Record<string, string[]>);
        } finally {
            hideLoading()
        }
    }


    return (
        <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={formData.password}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button className="w-full">Entrar</Button>
            </form>
        </div>
    )
}