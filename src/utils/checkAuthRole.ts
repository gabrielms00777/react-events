import { api } from "@/lib/axios"

export const checkAuthRole = async (role: string): Promise<boolean> => {
    try {
        const response = await api.get(`/api/check-role/${role}`)
        if (response.status === 204) return true
        return false
    } catch (error) {
        return false
    }
}