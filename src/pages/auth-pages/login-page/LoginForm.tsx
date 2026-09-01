import { useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/button/Button'
import InputField from '../../../components/ui/inputs/input-field/InputField'
import { useApi } from '../../../services/api'
import { useAuth } from '../../../services/context/auth-context/AuthContext'

type LoginResponse = {
  accessToken: string
  user: {
    userid: string
    name: string
    tenant_id: string
  }
  permissions?: string[]
}

type FieldErrors = {
  email?: string
  password?: string
}

/** Form logic only — uncontrolled inputs via useRef + useApi */
const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const { POST, loading, error } = useApi<LoginResponse>()
  const { login } = useAuth()
  const navigate = useNavigate()

  const validate = (email: string, password: string): FieldErrors => {
    const next: FieldErrors = {}

    if (!email) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email'
    }

    if (!password) {
      next.password = 'Password is required'
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters'
    }

    return next
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = emailRef.current?.value.trim() ?? ''
    const password = passwordRef.current?.value ?? ''
    const nextErrors = validate(email, password)

    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const resData = await POST('/auth/login', { email, password })
    // if (!result?.accessToken) return

    if (!resData?.status){
        console.log(resData?.statusMessage)
    }

    const resUserData = resData.data.userData;
    login(resUserData)
    navigate('/', { replace: true })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-6"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-app-primary-900">
          Login to your Account
        </h1>
        <p className="text-sm text-app-text-muted">
          Welcome back! Sign in to continue.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <InputField
          ref={emailRef}
          label="Email"
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          disabled={loading}
          error={fieldErrors.email}
          autoComplete="email"
        />
        <InputField
          ref={passwordRef}
          label="Password"
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          disabled={loading}
          error={fieldErrors.password}
          autoComplete="current-password"
        />
      </div>
      {error ? (
        <div
          role="alert"
          className="rounded-md border border-app-error bg-app-error-soft px-3 py-2 text-sm text-app-error"
        >
          {error.message}
        </div>
      ) : null}

      <Button
        type="submit"
        label={loading ? 'Signing in…' : 'Sign in'}
        variant="contained"
        size="md"
        fullWidth
        disabled={loading}
      />

      <p className="text-center text-sm text-app-text-muted">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-app-primary-500 hover:text-app-primary-800"
        >
          Register
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
