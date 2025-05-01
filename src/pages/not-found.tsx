import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-md w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-16 w-16 bg-amber-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-xl font-bold text-slate-200 mb-2">
          Page Not Found
        </h1>
        
        <p className="text-slate-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 