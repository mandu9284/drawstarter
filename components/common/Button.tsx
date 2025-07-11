import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'pause'
    | 'tertiary'
  size?: 'sm' | 'base'
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'base',
  ...props
}: ButtonProps) {
  const base = 'rounded px-4 py-2 font-medium'
  const sizes = {
    sm: 'text-sm',
    base: 'text-sm sm:text-base',
  }
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-gray-800 hover:bg-yellow-600',
    pause: 'bg-gray-500 text-white hover:bg-gray-600',
    tertiary: 'bg-transparent text-gray-500 hover:text-gray-400',
  }

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}>
      {children}
    </button>
  )
}
