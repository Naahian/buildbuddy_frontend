import { Routes, Route } from 'react-router-dom';
import Home from './pages/home_page';
import Login from './pages/login_page';
import Signup from './pages/signup_page';
import AdminPage from './pages/admin/admin';
import DashboardContent from './pages/admin/dashboard';
import UsersContent from './pages/admin/users';
import ProjectsContent from './pages/admin/projects';
import ComponentsContent from './pages/admin/components';
import OrdersContent from './pages/admin/orders';
import BuddyAI from './components/buddyaiform';
import ComponentShop from './pages/shop_page';
import ExploreProjects from './pages/projects_page';
import ComponentDetailPage from './pages/componentdetail_page'
import CartPage from './pages/cart_page';
import CheckoutPage from './pages/checkout_page';
import BuddyaiPage from './pages/buddyai_page';
import ProjectDetailPage from './pages/projectdetail_page';


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shop" element={<ComponentShop />} />
            <Route path="/projects" element={<ExploreProjects />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/components/:id" element={<ComponentDetailPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/buddyai" element={<BuddyaiPage />} />

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
