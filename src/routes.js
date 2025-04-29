import { Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Login from './pages/loginpage';
import Signup from './pages/signuppage';
import AdminPage from './pages/admin/admin';
import DashboardContent from './pages/admin/dashboard';
import UsersContent from './pages/admin/users';
import ProjectsContent from './pages/admin/projects';
import ComponentsContent from './pages/admin/components';
import OrdersContent from './pages/admin/orders';
import BuddyAI from './components/buddyaiform';



function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminPage />}>
                <Route path="dashboard" element={<DashboardContent />} />
                <Route path="users" element={<UsersContent />} />
                <Route path="projects" element={<ProjectsContent />} />
                <Route path="components" element={<ComponentsContent />} />
                <Route path="orders" element={<OrdersContent />} />
                <Route path="buddyai" element={<BuddyAI />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
