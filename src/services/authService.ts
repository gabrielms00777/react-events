import axios from "axios"
import { api } from "../lib/axios"
import { userStore } from "../store/userStore"

interface LoginData {
    email: string
    password: string
}

export const handleLoginRequest = async (data: LoginData): Promise<boolean> => {
    const { setUser } = userStore()
    try {
        await api.get('/sanctum/csrf-cookie')
        await api.post('/login', data)
        const response = await api.get('/api/user')
        console.log(response)

        if (response.data) {
            setUser(response.data.user)
            return true
        }

        return false

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(error)
            return error.response?.data?.errors || { general: ['Erro inesperado.'] };
        } else {
            throw error;
        }
    }
}

