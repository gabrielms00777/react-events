import { userStore } from "../../store/userStore"

export function AdminDashboard() {
    const { user } = userStore()
    console.log(user)
    return (
        <h1 className="text-3xl font-bold underline">
            AdminDashboard - {user?.name}
        </h1>
    )
}