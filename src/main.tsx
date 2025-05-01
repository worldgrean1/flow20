import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import OutletStandardsPage from './pages/outlet-standards.tsx'
import NotFoundPage from './pages/not-found.tsx'
import { ErrorBoundary } from './components/ui/error-boundary.tsx'
import './index.css'
import './styles/fonts.css'
import { LanguageProvider } from '../lib/language-context'
import { ThemeProvider } from './lib/theme-context.tsx'
import { BackgroundProvider } from './lib/background-context.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/outlet-standards',
    element: <OutletStandardsPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BackgroundProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </BackgroundProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
