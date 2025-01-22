import { FormEvent, useState } from "react"
import { loadingStore } from "../../store/loadingStore"
import { api } from "../../lib/axios"
import { errorStore } from "../../store/errorStore"
// import { handleLoginRequest } from "../../services/authService"
import { useNavigate } from "react-router"
import { userStore } from "../../store/userStore"

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
            setErrors(errors as Record<string, string[]>);
        } finally {
            hideLoading()
        }
    }

    const getUser = async () => {
        const res = await api.get('/api/user')
        console.log(res)
    }


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Entrar</button>
            </form>
            <button onClick={getUser} className="w-full bg-blue-500 text-white py-2 rounded mt-4">Get User</button>
        </div>
    )
}