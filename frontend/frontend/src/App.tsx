import { useState } from 'react'
import { AppLayout } from './layout/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { CookiePolicyPage } from './pages/CookiePolicyPage'
import { LoginPage } from './pages/LoginPage'
import { CookieProvider } from './context/CookieContext'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  function navigate(path: string) {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  const showCookiePolicy = currentPath === '/politica-cookies'

  return (
    <CookieProvider>
      <AppLayout mode={showCookiePolicy ? 'dashboard' : isAuthenticated ? 'dashboard' : 'login'}>
        {showCookiePolicy ? (
          <CookiePolicyPage onBack={() => navigate('/dashboard')} />
        ) : isAuthenticated ? (
          <DashboardPage
            onLogout={() => setIsAuthenticated(false)}
            onOpenPolicy={() => navigate('/politica-cookies')}
          />
        ) : (
          <LoginPage
            onLogin={() => {
              setIsAuthenticated(true)
              navigate('/dashboard')
            }}
          />
        )}
      </AppLayout>
    </CookieProvider>
  )
}

export default App
