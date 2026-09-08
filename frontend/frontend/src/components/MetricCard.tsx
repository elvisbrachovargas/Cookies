type MetricCardProps = {
  label: string
  value: string
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <article className="metric-card">
      <h2>{label}</h2>
      <p className="metric-value">{value}</p>
    </article>
  )
}
