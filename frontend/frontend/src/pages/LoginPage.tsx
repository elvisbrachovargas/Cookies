import { useState } from 'react'
import type { FormEvent } from 'react'

type LoginPageProps = {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.')
      return
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      setError('La contraseña debe tener al menos 6 caracteres, incluir una mayúscula y una minúscula.')
      return
    }

    setError('')
    onLogin()
  }

  return (
    <section className="login-container">
      <div className="container">
        <h1 className="heading">Iniciar Sesión</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <div className="agreement">
          <a href="#">Términos y condiciones</a>
        </div>
      </div>
    </section>
  )
}
