import { Badge, BadgeColor, type BadgeProps } from 'preact-aurora-ui'

export interface StatusBadgeProps {
  status: string
  variant?: 'badge' | 'inline'
}

export function StatusBadge({ status, variant = 'inline' }: StatusBadgeProps) {
  const getStatusColor = (status: string): BadgeColor => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return 'success'  // Zielony
      case 'warning':
        return 'warning'  // Pomarańczowy
      case 'degraded':
        return 'warning'  // Żółty (podobny do warning)
      case 'unhealthy':
        return 'error'    // Pomarańczowo-czerwony
      case 'error':
        return 'error'    // Jasnoczerwony
      default:
        return 'secondary' // Szary
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return {
          backgroundColor: '#22c55e', // Zielony - system zdrowy
          color: 'white'
        }
      case 'warning':
        return {
          backgroundColor: '#f59e0b', // Pomarańczowy - ostrzeżenie
          color: 'white'
        }
      case 'degraded':
        return {
          backgroundColor: '#eab308', // Żółty - wydajność obniżona
          color: 'black'
        }
      case 'unhealthy':
        return {
          backgroundColor: '#f87171', // Jasnoczerwony - system niezdrowy
          color: 'white'
        }
      case 'error':
        return {
          backgroundColor: '#dc2626', // Ciemnoczerwony - krytyczny błąd
          color: 'white'
        }
      default:
        return {
          backgroundColor: '#6b7280', // Szary - nieznany status
          color: 'white'
        }
    }
  }

  // For inline usage (status next to text), use a simple styled span
  if (variant === 'inline') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          ...getStatusStyle(status)
        }}
      >
        {status}
      </span>
    )
  }

  // For badge usage (positioned relative to an element), use Aurora Badge with proper typing
  const statusBadgeProps: Extract<BadgeProps, { variant: 'status' }> = {
    variant: 'status',
    color: getStatusColor(status),
    content: status.toUpperCase(),
    visible: true
  }

  return <Badge {...statusBadgeProps} />
}
