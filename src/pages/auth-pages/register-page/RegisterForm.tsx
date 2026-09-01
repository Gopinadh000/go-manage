import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/button/Button'
import InputField from '../../../components/ui/inputs/input-field/InputField'
import { useApi } from '../../../services/api'
import { useAuth } from '../../../services/context/auth-context/AuthContext'

type RegisterFormValues = {
  firstname: string
  lastname: string
  email: string
  tenant_name: string
  password: string
}

type FieldErrors = Partial<Record<keyof RegisterFormValues, string>>

type RegisterResponse = {
  accessToken: string
  user: {
    userid: string
    name: string
    tenant_id: string
  }
  permissions?: string[]
}

const INITIAL_VALUES: RegisterFormValues = {
  firstname: '',
  lastname: '',
  email: '',
  tenant_name: '',
  password: '',
}

/** Form logic — controlled with useState (no useRef) + useApi */
const RegisterForm = () => {
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const { POST, loading, error } = useApi<RegisterResponse>()
  // const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = (form: RegisterFormValues): FieldErrors => {
    const next: FieldErrors = {}

    if (!form.firstname.trim()) next.firstname = 'First name is required'
    if (!form.lastname.trim()) next.lastname = 'Last name is required'

    if (!form.email.trim()) {
      next.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email'
    }

    if (!form.tenant_name.trim()) {
      next.tenant_name = 'Organization name is required'
    } else if (form.tenant_name.trim().length < 2) {
      next.tenant_name = 'Organization name is too short'
    }

    if (!form.password) {
      next.password = 'Password is required'
    } else if (form.password.length < 6) {
      next.password = 'Password must be at least 6 characters'
    }

    return next
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Role is fixed — user cannot choose rights / tenant_id
    const payloadData = {
      firstname: values.firstname.trim(),
      lastname: values.lastname.trim(),
      email: values.email.trim(),
      tenant_name: values.tenant_name.trim(),
      password: values.password,
    }

    const resData = await POST('/auth/register', payloadData)
    if(resData?.status){
     navigate('/login', { replace: true })
    }   
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-app-primary-900">
          Create Super Admin account
        </h1>
        <p className="text-sm text-app-text-muted">
          Set up your organization. Tenant ID and permissions are assigned by
          the system.
        </p>
      </div>

      <div className="rounded-[3px] border border-app-primary-100 bg-app-primary-50 px-3 py-2 text-xs text-app-primary-800">
        Role: <span className="font-semibold">SUPER_ADMIN</span> — fixed for
        this registration
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="grid grid-cols-1 gap-3.5 mobile:grid-cols-2">
          <InputField
            label="First name"
            type="text"
            name="firstname"
            placeholder="John"
            value={values.firstname}
            onChange={handleChange}
            required
            disabled={loading}
            error={fieldErrors.firstname}
            autoComplete="given-name"
          />
          <InputField
            label="Last name"
            type="text"
            name="lastname"
            placeholder="Doe"
            value={values.lastname}
            onChange={handleChange}
            required
            disabled={loading}
            error={fieldErrors.lastname}
            autoComplete="family-name"
          />
        </div>

        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="john@company.com"
          value={values.email}
          onChange={handleChange}
          required
          disabled={loading}
          error={fieldErrors.email}
          autoComplete="email"
        />

        <InputField
          label="Organization name"
          type="text"
          name="tenant_name"
          placeholder="Acme Inc"
          value={values.tenant_name}
          onChange={handleChange}
          required
          disabled={loading}
          error={fieldErrors.tenant_name}
          autoComplete="organization"
        />

        <p className="-mt-1 text-xs text-app-text-muted">
          Tenant ID will be generated automatically after signup.
        </p>

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={values.password}
          onChange={handleChange}
          required
          disabled={loading}
          error={fieldErrors.password}
          autoComplete="new-password"
        />
      </div>

      {error ? (
        <div
          role="alert"
          className="rounded-[3px] border border-app-error bg-app-error-soft px-3 py-2 text-sm text-app-error"
        >
          {error.message}
        </div>
      ) : null}

      <Button
        type="submit"
        label={loading ? 'Creating account…' : 'Create account'}
        variant="contained"
        size="md"
        fullWidth
        disabled={loading}
        className="rounded-[3px]"
      />

      <p className="text-center text-sm text-app-text-muted">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-app-primary-500 hover:text-app-primary-800"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm
