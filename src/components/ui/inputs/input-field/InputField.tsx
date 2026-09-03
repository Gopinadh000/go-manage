import React, { useState, forwardRef } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type InputFieldProps = {
  label: string
  type: string
  placeholder: string
  error?: string
  name: string
  value?: string
  required?: boolean
  disabled?: boolean
  maxLength?: number
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur? : () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      name,
      label,
      type,
      placeholder,
      error,
      value,
      required,
      disabled,
      maxLength,
      inputMode,
      autoComplete,
      onBlur,
      onChange,
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor={name}
          className="text-[13px] font-medium text-app-text"
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-app-error" aria-hidden>
              *
            </span>
          ) : null}
        </label>

        <div className="relative flex items-center">
          <input
            ref={ref}
            id={name}
            name={name}
            type={inputType}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            inputMode={inputMode}
            onChange={onChange}
            disabled={disabled}
            required={required}
            onBlur={onBlur}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${name}-error` : undefined}
            autoComplete={
              autoComplete ?? (isPassword ? 'current-password' : 'email')
            }
            className={[
              'h-10 w-full rounded-[3px] border bg-app-surface px-3 text-sm text-app-text',
              'outline-none ring-0 transition-[border-color,box-shadow] duration-150',
              'placeholder:text-app-text-muted',
              'disabled:cursor-not-allowed disabled:bg-app-surface-muted disabled:text-app-text-muted',
              isPassword ? 'pr-10' : '',
              error
                ? 'border-app-error hover:border-app-error focus:border-app-error focus:ring-2 focus:ring-app-error-soft'
                : 'border-app-border-strong hover:border-app-primary-500 hover:ring-1 hover:ring-app-primary-100 focus:border-app-primary-500 focus:ring-2 focus:ring-app-primary-100',
            ].join(' ')}
          />

          {isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled}
              className="absolute right-1.5 inline-flex h-7 w-7 items-center justify-center rounded-[3px] text-app-text-muted transition-colors hover:bg-app-surface-muted hover:text-app-text-secondary disabled:pointer-events-none"
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: 17 }} />
              ) : (
                <Visibility sx={{ fontSize: 17 }} />
              )}
            </button>
          ) : null}
        </div>

        {error ? (
          <p id={`${name}-error`} className="text-xs text-app-error">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

InputField.displayName = 'InputField'

export default InputField
