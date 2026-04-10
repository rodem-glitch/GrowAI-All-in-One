import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

/* ── 타입 정의 ── */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
}

/* ── 변형별 스타일 ── */
const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-brand)',
    color: '#ffffff',
    border: '1px solid transparent',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-brand)',
    border: '1px solid var(--color-brand)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-secondary)',
    border: '1px solid transparent',
  },
  danger: {
    backgroundColor: 'var(--color-error)',
    color: '#ffffff',
    border: '1px solid transparent',
  },
};

const hoverVariantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: { backgroundColor: 'var(--color-brand-hover)' },
  secondary: { backgroundColor: 'var(--color-brand)', color: '#ffffff' },
  ghost: { backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text)' },
  danger: { backgroundColor: '#b91c1c' },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

/* ── 컴포넌트 ── */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled,
      children,
      className = '',
      style,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-medium rounded-lg',
          'transition-colors duration-150 cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          isDisabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          ...variantStyles[variant],
          focusVisibleRingColor: 'var(--color-brand)',
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            Object.assign(e.currentTarget.style, hoverVariantStyles[variant]);
          }
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            Object.assign(e.currentTarget.style, variantStyles[variant]);
            if (style) Object.assign(e.currentTarget.style, style);
          }
          onMouseLeave?.(e);
        }}
        {...rest}
      >
        {loading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
