import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-200">404</h1>
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Link to="/">
          <Button size="lg">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
