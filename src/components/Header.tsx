import { Link } from 'react-router-dom';
import { Button } from './Button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/envirocare-logo.png" 
              alt="Envirocare" 
              className="h-8 w-8"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-xl font-bold text-primary">Envirocare EMS</span>
            <span className="text-xl font-bold text-primary">Envirocare EMS</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/chatbot">
              <Button variant="outline" size="sm">
                Chatbot
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="outline" size="sm">
                Register
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
