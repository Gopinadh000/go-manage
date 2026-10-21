import { memo, useState, type FormEvent } from 'react'
import Button from '../../../../../components/ui/button/Button'
import InputField from '../../../../../components/ui/inputs/input-field/InputField'

function SecurityTab() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }
    setError('Password updates are not connected yet.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 id="settings-section-title" className="text-lg font-semibold text-app-text">Security</h2>
        <p className="mt-1 text-sm text-app-text-muted">Change your account password.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-lg border border-app-border p-4 tablet:p-5">
        <h3 className="text-sm font-semibold text-app-text">Change Password</h3>
        <InputField
          name="currentPassword"
          label="Current password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter current password"
          value={passwords.currentPassword}
          onChange={(event) => setPasswords((current) => ({ ...current, currentPassword: event.target.value }))}
        />
        <div className="grid grid-cols-1 gap-4 mobile:grid-cols-2">
          <InputField
            name="newPassword"
            label="New password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter new password"
            value={passwords.newPassword}
            onChange={(event) => setPasswords((current) => ({ ...current, newPassword: event.target.value }))}
          />
          <InputField
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm new password"
            value={passwords.confirmPassword}
            onChange={(event) => setPasswords((current) => ({ ...current, confirmPassword: event.target.value }))}
          />
        </div>
        {error && <p role="alert" className="text-sm text-app-error">{error}</p>}
        <div className="flex justify-end">
          <Button label="Update Password" type="submit" size="sm" />
        </div>
      </form>
    </div>
  )
}

export default memo(SecurityTab)
