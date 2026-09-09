import { useState } from 'react'
import { Button } from '../components/Button'
import { useCookies } from '../context/CookieContext'

type DashboardPageProps = {
  onLogout: () => void
  onOpenPolicy: () => void
}

const COOKIE_PURPOSES = [
  {
    id: 'storage',
    title: 'Almacenar la información en un dispositivo y/o acceder a ella',
    partnersCount: 851,
    description: 'Las cookies, los identificadores de dispositivos o los identificadores online de similares características (p. ej., los identificadores basados en inicio de sesión, los identificadores asignados aleatoriamente, los identificadores basados en la red), junto con otra información (p. ej., la información y el tipo del navegador, el idioma, el tamaño de la pantalla, las tecnologías compatibles, etc.), pueden almacenarse o leerse en tu dispositivo a fin de reconocerlo siempre que se conecte a una aplicación o a una página web para una o varias de las finalidades que se recogen en el presente texto.',
    example: 'La mayoría de las finalidades que se explican en este texto dependen del almacenamiento o del acceso a la información de tu dispositivo cuando utilizas una aplicación o visitas una página web. Por ejemplo, es posible que un proveedor o un editor/medio de comunicación necesiten almacenar una cookie en tu dispositivo la primera vez que visite una página web a fin de poder reconocer tu dispositivo las próximas veces que vuelva a visitarla (accediendo a esta cookie cada vez que lo haga).',
  },
  {
    id: 'measurement',
    title: 'Medir el rendimiento de los contenidos',
    partnersCount: 520,
    description: 'El rendimiento y la eficacia del contenido que ves o con el que interactúas se pueden medir y evaluar para generar informes estadísticos.',
    example: 'Analizar qué artículos de noticias leen los usuarios con más frecuencia o durante cuánto tiempo permanecen en una sección.',
  },
  {
    id: 'profiles',
    title: 'Crear perfiles para publicidad personalizada',
    partnersCount: 640,
    description: 'Se puede crear un perfil sobre ti y tus intereses para mostrarte publicidad personalizada y relevante en este y otros sitios web.',
    example: 'Mostrarte anuncios de tecnología si lees con frecuencia sobre innovación o ciudades inteligentes.',
  },
]

export function DashboardPage({ onLogout, onOpenPolicy }: DashboardPageProps) {
  const [showCookieSettings, setShowCookieSettings] = useState(false)
  const [expandedPurpose, setExpandedPurpose] = useState<string | null>(null)
  const [purposeDecisions, setPurposeDecisions] = useState<Record<string, boolean | null>>({})
  const { hasResponded, preferences, acceptAll, rejectOptional, saveCustom } = useCookies()
  const [customPreferences, setCustomPreferences] = useState(preferences)

  function togglePurpose(id: string) {
    setExpandedPurpose((current) => current === id ? null : id)
  }

  function savePurpose(id: string, enabled: boolean) {
    setPurposeDecisions((current) => ({ ...current, [id]: enabled }))
    if (id === 'measurement') setCustomPreferences((current) => ({ ...current, analytics: enabled }))
    if (id === 'profiles') setCustomPreferences((current) => ({ ...current, marketing: enabled }))
  }

  function openCookieSettings() {
    setCustomPreferences(preferences)
    setPurposeDecisions(hasResponded ? {
      storage: true,
      measurement: preferences.analytics,
      profiles: preferences.marketing,
    } : {})
    setShowCookieSettings(true)
  }

  function savePreferences() {
    saveCustom(customPreferences)
    setShowCookieSettings(false)
    setExpandedPurpose(null)
  }

  function acceptAllAndClose() {
    acceptAll()
    setShowCookieSettings(false)
  }

  function rejectOptionalAndClose() {
    rejectOptional()
    setShowCookieSettings(false)
  }

  return (
    <section className="dashboard-page" aria-labelledby="dashboard-title">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><span aria-hidden="true">N</span><strong>NOTICIAS</strong></div>
        <nav aria-label="Navegación principal">
          <a className="sidebar-link sidebar-link--active" href="#dashboard-title">⌂ <span>Portada</span></a>
          <a className="sidebar-link" href="#latest-title">▤ <span>Últimas noticias</span></a>
          <a className="sidebar-link" href="#topics-title">♧ <span>Secciones</span></a>
          <a className="sidebar-link" href="#latest-title">♧ <span>Alertas</span><b>9+</b></a>
          <a className="sidebar-link" href="#footer-news">⚙ <span>Preferencias</span></a>
        </nav>
        <small className="dashboard-version">Edición digital · 2026</small>
      </aside>

      <div className="dashboard-content">
        <header className="dashboard-topbar">
          <label className="dashboard-search">
            <span aria-hidden="true">⌕</span>
            <input type="search" placeholder="Buscar noticias..." aria-label="Buscar noticias" />
          </label>
          <div className="dashboard-actions">
            <Button className="subscribe-button" type="button">Suscribirme</Button>
            <Button className="logout-button" type="button" variant="danger" onClick={onLogout}>Salir</Button>
          </div>
        </header>

        <div className="dashboard-heading">
          <div>
            <p className="dashboard-kicker">Viernes, 4 de septiembre de 2026</p>
            <h1 id="dashboard-title">La actualidad, en contexto</h1>
          </div>
          <span className="dashboard-date">Edición de la mañana</span>
        </div>

        <div className="news-grid" id="topics-title">
          <article className="featured-story">
            <div className="story-image" role="img" aria-label="Ciudad al amanecer" />
            <div className="story-content">
              <span className="story-category">Tecnología</span>
              <h2>La nueva generación de ciudades inteligentes ya está tomando forma</h2>
              <p>Proyectos urbanos conectados están cambiando la manera en que nos movemos, consumimos energía y compartimos espacios.</p>
              <small>Por Laura Méndez · Hace 18 min</small>
            </div>
          </article>
          <aside className="topic-panel">
            <h2>Explora las secciones</h2>
            <a href="#latest-title"><b>01</b> Mundo <span>→</span></a>
            <a href="#latest-title"><b>02</b> Cultura <span>→</span></a>
            <a href="#latest-title"><b>03</b> Ciencia <span>→</span></a>
            <a href="#latest-title"><b>04</b> Economía <span>→</span></a>
          </aside>
        </div>

        <div className="dashboard-lower-grid">
          <section className="dashboard-panel dashboard-activity" aria-labelledby="latest-title">
            <div className="panel-title-row"><h2 id="latest-title">Últimas noticias</h2><a href="#latest-title">Ver todo</a></div>
            <div className="news-row"><span className="news-row__number">01</span><div><strong>El mapa que explica el nuevo equilibrio energético</strong><small>Economía · Hace 32 min</small></div><span className="news-row__arrow">↗</span></div>
            <div className="news-row"><span className="news-row__number">02</span><div><strong>Una exposición convierte la memoria en experiencia</strong><small>Cultura · Hace 1 h</small></div><span className="news-row__arrow">↗</span></div>
            <div className="news-row"><span className="news-row__number">03</span><div><strong>La misión que busca señales de vida en otro océano</strong><small>Ciencia · Hace 2 h</small></div><span className="news-row__arrow">↗</span></div>
          </section>
          <section className="dashboard-panel dashboard-summary" aria-labelledby="opinion-title">
            <span className="story-category">Opinión</span>
            <h2 id="opinion-title">El valor de mirar más despacio</h2>
            <p>Una columna sobre atención, tecnología y las conversaciones que estamos dejando fuera.</p>
            <a className="read-link" href="#opinion-title">Leer columna completa →</a>
          </section>
        </div>
        <footer id="footer-news" className="news-footer">Noticias · Información para entender lo que pasa</footer>
      </div>

      {!hasResponded && (
          <aside className="cookie-consent" aria-label="Consentimiento de cookies">
            <div className="cookie-consent__copy">
              <p>
                Antes de aceptar, te informamos de las finalidades: las cookies esenciales permiten el funcionamiento del sitio; las de análisis miden el uso; y las de marketing permiten personalizar publicidad. Con su acuerdo, nosotros y <a href="#cookie-partners">nuestros socios</a> usamos cookies o tecnologías similares para almacenar,
                acceder y procesar datos personales como su visita en este sitio web. Puede retirar su consentimiento o configurar sus preferencias
                en cualquier momento haciendo clic en «Configuración».
              </p>
              <button className="cookie-policy-link" type="button" onClick={onOpenPolicy}>Leer la Política de Cookies</button>
              <a className="cookie-consent__partners" href="#cookie-partners">Ver nuestros 24 socios</a>
              <strong>Nosotros y nuestros socios hacemos el siguiente tratamiento de datos:</strong>
              <span id="cookie-partners">Almacenar la información en un dispositivo y/o acceder a ella, compartir datos y perfiles para análisis y publicidad personalizada, medición de publicidad y contenido, investigación de audiencia y desarrollo de servicios.</span>
            </div>
            <div className="cookie-consent__actions">
              <Button className="cookie-reject-button" type="button" onClick={rejectOptional}>
                Solo necesarias
              </Button>
              <Button className="cookie-settings-button" type="button" onClick={openCookieSettings}>
                Configuración
              </Button>
              <Button className="cookie-accept-button" type="button" onClick={acceptAll}>
                Aceptar todo
              </Button>
            </div>
          </aside>

          )}

          {showCookieSettings && (
            <div className="cookie-modal-backdrop">
              <section className="cookie-settings" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
                <header className="cookie-settings__header">
                  <h2 id="cookie-settings-title">¿Para qué finalidades se utiliza mi información y quiénes la utilizan?</h2>
                  <button className="cookie-close" type="button" aria-label="Cerrar configuración" onClick={() => setShowCookieSettings(false)}>×</button>
                </header>
                <div className="cookie-settings__body">
                  <p>Este Sitio Web utiliza cookies propias y de otras entidades, para poder acceder y usar su información para las finalidades que se indican a continuación. Si no está de acuerdo con alguna de estas finalidades, podrá personalizar sus opciones a través de esta pantalla.</p>
                  <p>Nosotros y las empresas que colaboran con nosotros, tales como anunciantes, operadores publicitarios o intermediarios, usaremos su información obtenida a través de las cookies. Para conocer las empresas colaboradoras que incorporan sus cookies en nuestro sitio web puede acceder a través del botón <strong>Ver nuestros socios.</strong></p>
                  <p><strong>Información adicional:</strong> Puede conocer la información completa sobre el uso de las cookies, su configuración, origen, finalidades y derechos en nuestra <button className="cookie-policy-link cookie-policy-link--inline" type="button" onClick={onOpenPolicy}>Política de Cookies</button>.</p>
                  <p>Usted permite el uso de las cookies para las siguientes finalidades:</p>
                  {COOKIE_PURPOSES.map((purpose) => {
                    const isExpanded = expandedPurpose === purpose.id

                    return (
                      <div key={purpose.id} className={`cookie-purpose${isExpanded ? ' cookie-purpose--expanded' : ''}`}>
                        <div className="cookie-purpose__header">
                          <button className="cookie-purpose__toggle" type="button" aria-expanded={isExpanded} onClick={() => togglePurpose(purpose.id)}>
                            <strong className="cookie-purpose__title">{isExpanded ? '- ' : '+ '}{purpose.title}</strong>
                          </button>
                          <div className="cookie-purpose__choices">
                            <button className={purposeDecisions[purpose.id] === false ? 'cookie-choice--rejected' : ''} type="button" onClick={() => savePurpose(purpose.id, false)}>
                              {purposeDecisions[purpose.id] === false ? '× ' : ''}Rechazar
                            </button>
                            <button className={purposeDecisions[purpose.id] === true ? 'cookie-choice--accepted' : ''} type="button" onClick={() => savePurpose(purpose.id, true)}>
                              {purposeDecisions[purpose.id] === true ? '✓ ' : ''}Aceptar
                            </button>
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="cookie-purpose__details">
                            <p className="cookie-purpose__description">{purpose.description}</p>
                            <div className="cookie-purpose__example">
                              <strong>Ejemplos que muestran cómo nuestros socios procesan los datos según esta finalidad:</strong>
                              <p>{purpose.example}</p>
                            </div>
                            <div className="cookie-purpose__footer">
                              <div className="cookie-purpose__partners-badge">
                                <span>Consentimiento</span>
                                <small>{purpose.partnersCount} socios</small>
                              </div>
                              <div className="cookie-purpose__choices">
                                <button className={purposeDecisions[purpose.id] === false ? 'cookie-choice--rejected' : ''} type="button" onClick={() => savePurpose(purpose.id, false)}>
                                  {purposeDecisions[purpose.id] === false ? '× ' : ''}Rechazar
                                </button>
                                <button className={purposeDecisions[purpose.id] === true ? 'cookie-choice--accepted' : ''} type="button" onClick={() => savePurpose(purpose.id, true)}>
                                  {purposeDecisions[purpose.id] === true ? '✓ ' : ''}Aceptar
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                <footer className="cookie-settings__footer">
                  <span className="cookie-brand">▰ <small>FAST CHECK</small></span>
                  <div className="cookie-footer-controls">
                    <div className="cookie-footer-actions"><button type="button" onClick={rejectOptionalAndClose}>Rechazar todo</button><button type="button" onClick={acceptAllAndClose}>Aceptar todo</button><button className="cookie-save" type="button" onClick={savePreferences}>Guardar</button></div>
                    <em>Guardar todas las preferencias y continuar</em>
                  </div>
                </footer>
              </section>
            </div>
      )}

      {hasResponded && (
        <Button className="cookie-reopen-button" type="button" onClick={openCookieSettings}>
          Preferencias de cookies
        </Button>
      )}
    </section>
  )
}
