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
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-300 text-black',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    pause: 'bg-gray-500 text-white',
    tertiary: 'bg-transparent text-gray-500 hover:text-gray-700',
  }

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}>
      {children}
    </button>
  )
}
