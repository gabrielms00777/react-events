import { Route, Routes } from "react-router"
import { Home } from "./pages/Home"
import { SiteLayout } from "./layouts/SiteLayout"
import { ProtectedRoute } from "./layouts/ProtectedRoute"
import { Events } from "./pages/Events"
import { Login } from "./pages/auth/Login"
import { EventDetails } from "./pages/EventDetails"
import { AdminLayout } from "./layouts/AdminLayout"
import { AdminDashboard } from "./pages/admin/AdminDashboard"
import { EventIndex } from "./pages/admin/event/Index"
import { EventCreate } from "./pages/admin/event/Create"
import { Reports } from "./pages/admin/Reports"
import { Profile } from "./pages/admin/Profile"
import { EventAdminLayout } from "./layouts/EventAdminLayout"
import { EventDashboard } from "./pages/event/admin/EventDashboard"
import { StaffList } from "./pages/event/admin/staff/Index"
import { StaffCreate } from "./pages/event/admin/staff/Create"
import { VisitorList } from "./pages/event/admin/visitors/Index"
import { VisitorCreate } from "./pages/event/admin/visitors/Create"
import { CheckIn } from "./pages/staff/checkIn"

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Super Admin Routes */}
      <Route path="admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<EventIndex />} />
          <Route path="events/create" element={<EventCreate />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Event Admin Routes */}
      <Route path="event/:uuid" element={<EventAdminLayout />}>
        <Route index element={<EventDashboard />} />
        <Route path="staff" element={<StaffList />} />
        <Route path="staff/create" element={<StaffCreate />} />
        <Route path="visitors" element={<VisitorList />} />
        <Route path="visitors/create" element={<VisitorCreate />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Staff Routes */}
      <Route path="staff/check-in" element={<CheckIn />} />

      {/* Shared Routes */}
      {/* <Route path="profile" element={<Profile />} />
      <Route path="notifications" element={<Notifications />} /> */}

      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
