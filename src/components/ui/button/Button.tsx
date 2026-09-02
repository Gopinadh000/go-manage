import type { ReactNode } from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: 'outlined' | 'contained'
  startIcon?: ReactNode
  endIcon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

const variantClasses = {
  contained:
    'bg-app-primary-500 text-app-text-inverse hover:bg-app-primary-800 disabled:hover:bg-app-primary-500',
  outlined:
    'bg-app-surface text-app-text border border-app-secondary-800 hover:bg-app-primary-50',
} as const

const sizeClasses = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm font-medium',
  lg: 'h-12 px-5 text-base font-medium',
} as const

const Button = ({
  startIcon,
  endIcon,
  onClick,
  label = 'Submit',
  type = 'button',
  variant = 'contained',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex cursor-pointer items-center justify-center gap-2 rounded-md
        outline-none transition-colors
        disabled:cursor-not-allowed disabled:opacity-60
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {startIcon ? <span className="inline-flex">{startIcon}</span> : null}
      {label}
      {endIcon ? <span className="inline-flex">{endIcon}</span> : null}
    </button>
  )
}

export default Button
