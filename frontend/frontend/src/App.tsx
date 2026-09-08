import { useState } from 'react'
import { AppLayout } from './layout/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { CookieProvider } from './context/CookieContext'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <CookieProvider>
      <AppLayout mode={isAuthenticated ? 'dashboard' : 'login'}>
        {isAuthenticated ? (
          <DashboardPage onLogout={() => setIsAuthenticated(false)} />
        ) : (
          <LoginPage onLogin={() => setIsAuthenticated(true)} />
        )}
      </AppLayout>
    </CookieProvider>
  )
}

export default App
