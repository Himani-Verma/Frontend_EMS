import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/auth';

export const DashboardCE: React.FC = () => {
  const { role, clearRole } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">
            Customer Executive Dashboard
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Welcome to the Customer Executive Dashboard. You are currently logged in as: <strong>{role}</strong>
          </p>
          <p className="text-sm text-slate-500 mb-8">
            This is a placeholder page. The full dashboard functionality will be implemented in future iterations.
          </p>
          
          <div className="space-x-4">
            <Link to="/">
              <Button>
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" onClick={clearRole}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
