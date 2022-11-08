import type { ReactElement, ReactNode, ButtonHTMLAttributes } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>&{
  children: ReactNode
  variant: 'default' | 'colored' | 'accent'
}

export function Button (props: ButtonProps): ReactElement<HTMLButtonElement> {
  const { variant, children, ...otherProps } = props
  const className = cn(styles.button, styles[variant], props.className)

  return (
    <button className={className} {...otherProps}>
      <span>
        {children}
      </span>
    </button>
  )
}