import MuiCheckbox from '@mui/material/Checkbox'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  ariaLabel: string
  indeterminate?: boolean
  disabled?: boolean
}

const Checkbox = ({
  checked,
  onChange,
  ariaLabel,
  indeterminate = false,
  disabled = false,
}: CheckboxProps) => (
  <MuiCheckbox
    checked={checked}
    indeterminate={indeterminate}
    disabled={disabled}
    onChange={(event) => onChange(event.target.checked)}
    inputProps={{ 'aria-label': ariaLabel }}
    size="small"
    sx={{
      p: 0.5,
      color: 'var(--app-text-muted)',
      '&.Mui-checked, &.MuiCheckbox-indeterminate': {
        color: 'var(--app-primary-500)',
      },
      '&.Mui-focusVisible': {
        outline: '2px solid var(--app-primary-500)',
        outlineOffset: 2,
      },
    }}
  />
)

export default Checkbox
