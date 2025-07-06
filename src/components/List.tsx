import type { ComponentChildren } from 'preact'
import type { JSX } from 'preact/jsx-runtime'

export interface ListProps {
  children?: ComponentChildren
  ordered?: boolean
  className?: string
  style?: JSX.CSSProperties
}

export interface ListItemProps {
  children?: ComponentChildren
  className?: string
  style?: JSX.CSSProperties
}

export function List({ children, ordered = false, className = '', style = {} }: ListProps) {
  const listStyle: JSX.CSSProperties = {
    marginTop: '0.5rem',
    marginLeft: '1.5rem',
    ...style
  }

  if (ordered) {
    return (
      <ol className={className} style={listStyle}>
        {children}
      </ol>
    )
  }

  return (
    <ul className={className} style={listStyle}>
      {children}
    </ul>
  )
}

export function ListItem({ children, className = '', style = {} }: ListItemProps) {
  return (
    <li className={className} style={style}>
      {children}
    </li>
  )
}
