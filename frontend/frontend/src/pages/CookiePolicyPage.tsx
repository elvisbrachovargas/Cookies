type CookiePolicyPageProps = {
  onBack: () => void
}

export function CookiePolicyPage({ onBack }: CookiePolicyPageProps) {
  return (
    <section className="policy-page" aria-labelledby="cookie-policy-title">
      <article className="policy-document">
        <p className="policy-meta">Versión 2026-09-09 · Última actualización: 9 de septiembre de 2026</p>
        <h1 id="cookie-policy-title">Política de Cookies</h1>
        <p>Esta política explica qué tecnologías utilizamos, para qué finalidades y cómo puedes decidir sobre las cookies no esenciales.</p>

        <h2>Qué son las cookies</h2>
        <p>Las cookies son pequeños archivos que se almacenan en tu dispositivo. Las cookies esenciales son necesarias para que el sitio funcione y no requieren consentimiento cuando la ley aplicable permite su uso.</p>

        <h2>Finalidades y elección</h2>
        <p><strong>Esenciales:</strong> permiten funciones básicas, seguridad y almacenamiento de tu elección.</p>
        <p><strong>Análisis:</strong> ayudan a medir el uso y mejorar el contenido. Solo se activan si las aceptas.</p>
        <p><strong>Marketing:</strong> permiten personalizar publicidad y medir campañas. Solo se activan si las aceptas.</p>

        <h2>Cómo registramos tu decisión</h2>
        <p>Cuando eliges una opción, guardamos tu selección en una cookie local y enviamos un registro al backend con un identificador único, la fecha y hora de la decisión, las categorías elegidas, esta versión de la política y la URL de esta página. El registro técnico incluye el agente de usuario y la dirección IP para mantener evidencia de la operación y atender obligaciones de seguridad y auditoría.</p>

        <h2>Cómo cambiar tu elección</h2>
        <p>Puedes abrir «Preferencias de cookies» en cualquier momento para aceptar, rechazar o modificar las categorías opcionales. Una nueva decisión crea un nuevo registro auditable.</p>

        <h2>Contacto</h2>
        <p>Para consultas sobre cookies o privacidad, utiliza el canal de contacto habilitado por el responsable del sitio.</p>
        <button className="policy-back-button" type="button" onClick={onBack}>Volver al sitio</button>
      </article>
    </section>
  )
}
