import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { DashboardCE } from './pages/DashboardCE';
import { DashboardSales } from './pages/DashboardSales';
import { Chatbot } from './pages/Chatbot';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/register',
    element: <Register />
  },
  {
    path: '/dashboard/admin',
    element: <DashboardAdmin />
  },
  {
    path: '/dashboard/ce',
    element: <DashboardCE />
  },
  {
    path: '/dashboard/sales',
    element: <DashboardSales />
  },
  {
    path: '/chatbot',
    element: <Chatbot />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
