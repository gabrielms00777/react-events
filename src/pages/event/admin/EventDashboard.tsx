import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users, ClipboardList } from "lucide-react";

// Dados do evento (mockados por enquanto)
const eventData = {
    name: "Tech Conference 2024",
    image: "https://placehold.co/600x300",
    daysLeft: 15,
    totalVisitors: 350,
    registeredVisitors: 280,
    totalStaff: 50,
    completedTasks: 12,
    totalTasks: 20,
};

export function EventDashboard() {
    const progress = (eventData.completedTasks / eventData.totalTasks) * 100;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard - {eventData.name}</h1>

            <div className="relative">
                <img
                    src={eventData.image}
                    alt="Event Banner"
                    className="w-full h-64 rounded-lg shadow-lg object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold">{eventData.name}</h2>
                    <p className="text-sm">Faltam {eventData.daysLeft} dias para o evento</p>
                </div>
            </div>

            {/* Cards de métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Dias Restantes</CardTitle>
                        <Calendar className="w-6 h-6 text-blue-600" />
                    </CardHeader>
                    <CardContent className="text-4xl font-bold text-gray-700">
                        {eventData.daysLeft}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Visitantes Inscritos</CardTitle>
                        <Users className="w-6 h-6 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gray-700">
                            {eventData.registeredVisitors} / {eventData.totalVisitors}
                        </p>
                        <Progress value={(eventData.registeredVisitors / eventData.totalVisitors) * 100} />
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Equipe</CardTitle>
                        <ClipboardList className="w-6 h-6 text-purple-600" />
                    </CardHeader>
                    <CardContent className="text-4xl font-bold text-gray-700">
                        {eventData.totalStaff}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Tarefas Concluídas</CardTitle>
                        <Clock className="w-6 h-6 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gray-700">
                            {eventData.completedTasks} / {eventData.totalTasks}
                        </p>
                        <Progress value={progress} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
