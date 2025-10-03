import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Chatbot: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Chatbot
          </h1>
          <p className="text-sm font-medium text-slate-600">
            This page will host your chatbot iframe. You can embed this route into WordPress via an iframe.
          </p>
        </div>

        <div className="card p-8">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <div className="text-slate-500">
              <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Chatbot iframe goes here
              </h3>
              <p className="text-slate-500">
                This is where your chatbot iframe will be embedded.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
