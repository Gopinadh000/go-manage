import { memo, useState, type ReactNode } from 'react'
import { CheckCircle, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../../../../services/context/theme-context/ThemeContext'
import { brandPalettes, palleteLabels, type ThemeMode, type ThemePallete } from '../../../../../styles'

const paletteKeys = Object.keys(brandPalettes) as ThemePallete[]

const languages = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'es', label: 'Español' },
]

function getStoredTimeFormat() {
  return localStorage.getItem('timeFormat') === '24h' ? '24h' : '12h'
}

function AppearanceTab() {
  const { mode, palette, setMode, setPallete } = useTheme()
  const { i18n } = useTranslation()
  const [timeFormat, setTimeFormat] = useState(getStoredTimeFormat)

  const changeLanguage = (language: string) => {
    void i18n.changeLanguage(language)
    localStorage.setItem('appLanguage', language)
  }

  const changeTimeFormat = (format: string) => {
    setTimeFormat(format)
    localStorage.setItem('timeFormat', format)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 id="settings-section-title" className="text-lg font-semibold text-app-text">Appearance</h2>
        <p className="mt-1 text-sm text-app-text-muted">Customize the way Go Manage looks and displays information.</p>
      </div>

      <section className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-app-text">Theme</h3>
          <p className="mt-1 text-xs text-app-text-muted">Choose an accent color for the application.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 mobile:grid-cols-2 desktop:grid-cols-4">
          {paletteKeys.map((option) => {
            const colors = brandPalettes[option]
            const selected = palette === option
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setPallete(option)}
                className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                  selected
                    ? 'border-app-primary-500 bg-app-primary-50'
                    : 'border-app-border hover:bg-app-bg'
                }`}
              >
                <span className="flex -space-x-1">
                  {[colors[100], colors[500], colors[800]].map((color) => (
                    <span
                      key={color}
                      className="h-6 w-6 rounded-full border-2 border-app-surface"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>
                <span className="flex-1 text-sm font-medium text-app-text">{palleteLabels[option]}</span>
                {selected && <CheckCircle className="text-app-primary-500" sx={{ fontSize: 18 }} />}
              </button>
            )
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-app-text">Mode</h3>
          <p className="mt-1 text-xs text-app-text-muted">Select light or dark appearance.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 mobile:grid-cols-2">
          {([
            { value: 'light', label: 'Light', icon: <LightModeOutlined fontSize="small" /> },
            { value: 'dark', label: 'Dark', icon: <DarkModeOutlined fontSize="small" /> },
          ] as { value: ThemeMode; label: string; icon: ReactNode }[]).map((option) => {
            const selected = mode === option.value
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setMode(option.value)}
                className={`flex items-center gap-3 rounded-lg border p-3 text-sm font-medium transition-colors ${
                  selected
                    ? 'border-app-primary-500 bg-app-primary-50 text-app-primary-800'
                    : 'border-app-border text-app-text hover:bg-app-bg'
                }`}
              >
                {option.icon}
                {option.label}
                {selected && <CheckCircle className="ml-auto text-app-primary-500" sx={{ fontSize: 18 }} />}
              </button>
            )
          })}
        </div>
      </section>

      <section className="grid max-w-2xl grid-cols-1 gap-4 rounded-lg border border-app-border p-4 mobile:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-app-text" htmlFor="settings-language">
          Language
          <select
            id="settings-language"
            value={i18n.resolvedLanguage || i18n.language}
            onChange={(event) => changeLanguage(event.target.value)}
            className="h-10 rounded-md border border-app-border bg-app-surface px-3 text-sm font-normal text-app-text outline-none focus:border-app-primary-500"
          >
            {languages.map((language) => (
              <option key={language.value} value={language.value}>{language.label}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-app-text" htmlFor="settings-time-format">
          Time format
          <select
            id="settings-time-format"
            value={timeFormat}
            onChange={(event) => changeTimeFormat(event.target.value)}
            className="h-10 rounded-md border border-app-border bg-app-surface px-3 text-sm font-normal text-app-text outline-none focus:border-app-primary-500"
          >
            <option value="12h">12-hour (1:30 PM)</option>
            <option value="24h">24-hour (13:30)</option>
          </select>
        </label>
      </section>
      <p className="text-xs text-app-text-muted">Time format is saved as a preference for future use.</p>
    </div>
  )
}

export default memo(AppearanceTab)
