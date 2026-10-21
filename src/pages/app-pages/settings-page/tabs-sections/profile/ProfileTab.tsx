import { memo, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AlternateEmailOutlined,
  CalendarMonthOutlined,
  CameraAltOutlined,
  LightbulbOutlined,
  LocationOnOutlined,
  PersonOutlined,
} from '@mui/icons-material'
import Button from '../../../../../components/ui/button/Button'
import InputField from '../../../../../components/ui/inputs/input-field/InputField'
import { useAuth } from '../../../../../services/context/auth-context/AuthContext'

interface ProfileFormValues {
  firstName: string
  lastName: string
  role: string
  designation: string
  education: string
  skills: string
  address: string
}

const roleOptions = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'USER', label: 'User' },
]

const inputClass =
  'h-10 w-full rounded-md border border-app-border bg-app-surface px-3 text-sm text-app-text outline-none transition-colors placeholder:text-app-text-muted focus:border-app-primary-500 focus:ring-2 focus:ring-app-primary-100 disabled:bg-app-bg disabled:text-app-text-secondary'

function getRoleValue(roleName?: string, roleId?: number) {
  if (roleName) return roleName
  if (roleId === 1001) return 'SUPER_ADMIN'
  if (roleId === 1002) return 'MANAGER'
  return 'USER'
}

function ProfileTab() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')
  const [values, setValues] = useState<ProfileFormValues>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: getRoleValue(user?.rolename, user?.userRoleId),
    designation: '',
    education: '',
    skills: '',
    address: '',
  })

  const fullName = [values.firstName, values.lastName].filter(Boolean).join(' ') || 'Your name'
  const initials = [values.firstName, values.lastName]
    .filter(Boolean)
    .map((name) => name[0])
    .join('')
    .toUpperCase() || 'U'
  const roleLabel =
    roleOptions.find((option) => option.value === values.role.toUpperCase())?.label ||
    values.role ||
    'Workspace member'

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setSavedMessage('')
  }

  const handleEdit = () => {
    setEditing(true)
    setSavedMessage('')
  }

  const handleCancel = () => {
    setValues({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      role: getRoleValue(user?.rolename, user?.userRoleId),
      designation: '',
      education: '',
      skills: '',
      address: '',
    })
    setEditing(false)
    setSavedMessage('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEditing(false)
    setSavedMessage('Profile preview updated. Connect your profile API to save these changes.')
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="settings-section-title" className="text-lg font-semibold text-app-text">Profile</h2>
          <p className="mt-1 text-sm text-app-text-muted">
            Update your personal information and profile details.
          </p>
        </div>
        {!editing && (
          <Button
            label="Edit"
            variant="outlined"
            size="sm"
            startIcon={<PersonOutlined sx={{ fontSize: 17 }} />}
            onClick={handleEdit}
            className="border-app-primary-500 text-app-primary-500 hover:bg-app-primary-50"
          />
        )}
      </header>

      <section className="flex flex-col gap-5 rounded-lg border border-app-border p-4 tablet:flex-row tablet:items-center tablet:p-5">
        <div className="relative mx-auto shrink-0 tablet:mx-0">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-app-primary-100 text-2xl font-semibold text-app-primary-800 tablet:h-24 tablet:w-24">
            {initials}
          </span>
          <button
            type="button"
            aria-label="Profile photo upload is not connected"
            title="Profile photo upload is not connected yet"
            // disabled
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-app-surface bg-app-primary-500 text-white disabled:cursor-not-allowed"
          >
            <CameraAltOutlined sx={{ fontSize: 16 }} />
          </button>
        </div>

        <div className="min-w-0 flex-1 text-center tablet:text-left">
          <h3 className="text-base font-semibold text-app-text">{fullName}</h3>
          <span className="mt-1 inline-flex rounded-full bg-app-primary-50 px-2.5 py-1 text-xs font-medium text-app-primary-800">
            {values.designation || roleLabel}
          </span>
          <div className="mt-3 flex flex-col gap-2 text-xs text-app-text-muted">
            <p className="flex min-w-0 items-center justify-center gap-2 tablet:justify-start">
              <AlternateEmailOutlined sx={{ fontSize: 15 }} />
              <span className="truncate">{user?.email || 'Email not provided'}</span>
            </p>
            <p className="flex items-center justify-center gap-2 tablet:justify-start">
              <LocationOnOutlined sx={{ fontSize: 15 }} />
              <span>{values.address || 'Location not added'}</span>
            </p>
            <p className="flex items-center justify-center gap-2 tablet:justify-start">
              <CalendarMonthOutlined sx={{ fontSize: 15 }} />
              <span>Joined date not available</span>
            </p>
          </div>
        </div>

        <blockquote className="w-full rounded-lg bg-app-primary-50 p-4 tablet:max-w-48">
          <span aria-hidden="true" className="text-2xl font-semibold leading-none text-app-primary-500">“</span>
          <p className="mt-1 text-sm font-medium leading-5 text-app-text">
            Keep learning, keep building better things.
          </p>
          <cite className="mt-2 block text-xs not-italic text-app-text-muted">— Go Manage</cite>
        </blockquote>
      </section>

      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={!editing}
          className="min-w-0 rounded-lg border border-app-border p-4 tablet:p-5"
        >
          <legend className="px-1 text-sm font-semibold text-app-text">Personal Information</legend>
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 mobile:grid-cols-2">
            <InputField
              name="firstName"
              label="First Name"
              type="text"
              placeholder="Enter first name"
              value={values.firstName}
              required
              onChange={updateField}
            />
            <InputField
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              value={values.lastName}
              required
              onChange={updateField}
            />
            <label className="flex w-full flex-col gap-1">
              <span className="text-[13px] font-medium text-app-text">Role</span>
              <select
                name="role"
                value={values.role}
                onChange={updateField}
                className={inputClass}
                disabled

              >
                {!roleOptions.some((option) => option.value === values.role.toUpperCase()) && (
                  <option value={values.role}>{values.role}</option>
                )}
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <InputField
              name="designation"
              label="Designation"
              type="text"
              placeholder="Add your designation"
              value={values.designation}
              onChange={updateField}
            />
            <InputField
              name="education"
              label="Education"
              type="text"
              placeholder="Add your education"
              value={values.education}
              onChange={updateField}
            />
            <InputField
              name="skills"
              label="Skills"
              type="text"
              placeholder="Add skills separated by commas"
              value={values.skills}
              onChange={updateField}
            />
            <label className="flex w-full flex-col gap-1 mobile:col-span-2">
              <span className="text-[13px] font-medium text-app-text">Address</span>
              <textarea
                name="address"
                value={values.address}
                onChange={updateField}
                maxLength={300}
                rows={3}
                placeholder="Add your address"
                className="w-full resize-y rounded-md border border-app-border bg-app-surface px-3 py-2 text-sm text-app-text outline-none transition-colors placeholder:text-app-text-muted focus:border-app-primary-500 focus:ring-2 focus:ring-app-primary-100 disabled:bg-app-bg disabled:text-app-text-secondary"
              />
              <span className="text-right text-[10px] text-app-text-muted">{values.address.length}/300</span>
            </label>
          </div>
        </fieldset>

        {savedMessage && (
          <p role="status" className="mt-3 flex items-center gap-2 rounded-md bg-app-primary-50 px-3 py-2 text-xs text-app-primary-800">
            <LightbulbOutlined sx={{ fontSize: 16 }} />
            {savedMessage}
          </p>
        )}

        {editing && (
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <Button label="Cancel" variant="outlined" size="sm" onClick={handleCancel} />
            <Button label="Save Profile Preview" type="submit" size="sm" />
          </div>
        )}
      </form>
    </div>
  )
}

export default memo(ProfileTab)
