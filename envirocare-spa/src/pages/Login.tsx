import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuthStore } from '../store/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAuthStore();

  const handleRoleLogin = (role: 'admin' | 'ce' | 'sales') => {
    setRole(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Choose your role to continue
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => handleRoleLogin('admin')}
            className="w-full"
            size="lg"
          >
            Login as Admin
          </Button>
          
          <Button
            onClick={() => handleRoleLogin('ce')}
            className="w-full"
            size="lg"
          >
            Login as Customer Executive
          </Button>
          
          <Button
            onClick={() => handleRoleLogin('sales')}
            className="w-full"
            size="lg"
          >
            Login as Sales Executive
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-medium text-primary hover:text-primary/80">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
