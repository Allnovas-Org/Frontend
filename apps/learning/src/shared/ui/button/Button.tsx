import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  startIcon?: ReactNode
  endIcon?: ReactNode
  fullWidth?: boolean
  isLoading?: boolean
  loadingLabel?: string
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

function getVariantClasses(variant: ButtonVariant): string {
  const variants = {
    primary:
      'bg-primary text-surface hover:bg-[#5a0b92] active:bg-[#4a0a7a]',
    secondary:
      'text-primary border border-strong hover:bg-primary/20 active:bg-primary/15',
    ghost:
      'text-neutral-900 bg-transparent border border-subtle hover:bg-surface-soft active:bg-[#fdf7ef]',
    danger:
      'bg-[#b42318] text-white hover:bg-[#9f1f15] active:bg-[#8b1a12]',
  }
  return variants[variant]
}

function getSizeClasses(size: ButtonSize): string {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3.5 py-2.5 text-sm',
    lg: 'p-4 text-lg',
  }
  return sizes[size]
}

export function Button({
  variant = 'primary',
  size = 'lg',
  startIcon,
  endIcon,
  fullWidth = false,
  isLoading = false,
  loadingLabel = 'Loading...',
  children,
  className,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[11px] font-semibold transition-colors duration-200',
        'disabled:cursor-not-allowed disabled:opacity-70',
        fullWidth && 'w-full',
        getVariantClasses(variant),
        getSizeClasses(size),
        className,
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="whitespace-nowrap">{loadingLabel}</span>
      ) : (
        <>
          {startIcon ? <span className="inline-flex leading-none">{startIcon}</span> : null}
          <span className="whitespace-nowrap">{children}</span>
          {endIcon ? <span className="inline-flex leading-none">{endIcon}</span> : null}
        </>
      )}
    </button>
  )
}
