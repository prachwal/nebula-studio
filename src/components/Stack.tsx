import type { ComponentChildren } from 'preact'
import type { JSX } from 'preact/jsx-runtime'

export interface StackProps {
  children?: ComponentChildren
  spacing?: string | number
  direction?: 'vertical' | 'horizontal'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  className?: string
  style?: JSX.CSSProperties
}

export function Stack({ 
  children, 
  spacing = '1rem', 
  direction = 'vertical',
  align = 'stretch',
  justify = 'start',
  className = '',
  style = {} 
}: StackProps) {
  const stackStyle: JSX.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: align === 'stretch' ? 'stretch' : 
                align === 'start' ? 'flex-start' :
                align === 'end' ? 'flex-end' : 'center',
    justifyContent: justify === 'start' ? 'flex-start' :
                   justify === 'end' ? 'flex-end' :
                   justify === 'between' ? 'space-between' :
                   justify === 'around' ? 'space-around' : 'center',
    gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
    ...style
  }

  return (
    <div className={className} style={stackStyle}>
      {children}
    </div>
  )
}
