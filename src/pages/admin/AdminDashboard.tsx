import { userStore } from "../../store/userStore"

export function AdminDashboard() {
  const { user } = userStore()
  return (
    <div>
      <h1 className="text-3xl font-bold">Bem-vindo ao Painel - {user?.name}</h1>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Eventos</h2>
          <p className="text-2xl font-bold">23</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Funcionários</h2>
          <p className="text-2xl font-bold">145</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Visitantes</h2>
          <p className="text-2xl font-bold">1.023</p>
        </div>
      </div>
    </div>
  )
}