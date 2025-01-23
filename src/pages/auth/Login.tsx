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
    const { user, setUser } = userStore()
    // const { setToken, setUser } = userStore()

    const [formData, setFormData] = useState({
        email: 'admin@admin',
        password: 'admin'
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        showLoading()
        try {
            // const success = await handleLoginRequest(formData)
            await api.get('/sanctum/csrf-cookie')
            await api.post('/login', formData)
            const response = await api.get('/api/user')
            console.log(response)

            if (response.data) {
                // console.log(response.data)
                setUser(response.data)
                console.log(user)
                navigate('/admin')
                return
            }

            // if (success) {
            //     navigate('/admin')
            // }
        } catch (errors: unknown) {
            setErrors(errors.response.data.errors as Record<string, string[]>);
        } finally {
            hideLoading()
        }
    }

    const getUser = async () => {
        const res = await api.get('/api/user')
        console.log(res)
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
            <button onClick={getUser} className="w-full py-2 mt-4 text-white bg-blue-500 rounded">Get User</button>
        </div>
    )
}