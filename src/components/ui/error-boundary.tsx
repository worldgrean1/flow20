import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError();
  
  // Check if it's a route error
  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-md w-full text-center">
          <div className="mb-4 flex justify-center">
            {error.status === 404 ? (
              <div className="h-16 w-16 bg-amber-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-amber-500" />
              </div>
            ) : (
              <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            )}
          </div>
          
          <h1 className="text-xl font-bold text-slate-200 mb-2">
            {error.status === 404 ? 'Page Not Found' : 'Unexpected Error'}
          </h1>
          
          <p className="text-slate-400 mb-6">
            {error.status === 404 
              ? "The page you're looking for doesn't exist or has been moved."
              : "Something went wrong. We're working on fixing it."}
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
          
          {error.status !== 404 && (
            <div className="mt-4 p-3 bg-slate-800/50 rounded-md text-sm text-slate-500 text-left overflow-auto">
              <pre>{error.data?.message || error.statusText}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }

  // For non-route errors
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 max-w-md w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-xl font-bold text-slate-200 mb-2">
          Unexpected Error
        </h1>
        
        <p className="text-slate-400 mb-6">
          Something went wrong with the application.
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
        
        <div className="mt-4 p-3 bg-slate-800/50 rounded-md text-sm text-slate-500 text-left overflow-auto">
          <pre>{error instanceof Error ? error.message : 'Unknown error'}</pre>
        </div>
      </div>
    </div>
  );
} 