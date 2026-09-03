
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './services/context/theme-context/ThemeContext.tsx'
import  { applyTheme, type  ThemeMode , type  ThemePallete } from './styles/index.ts'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './services/context/auth-context/AuthContext.tsx';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const bootMode = ((): ThemeMode => {
  const stored = localStorage.getItem('go_manage_theme_mode')
  return stored === 'dark' ? 'dark' : 'light'
})()
const bootPalette = ((): ThemePallete => {
  const stored = localStorage.getItem('go_manage_theme_palette')
  if (stored === 'blue' || stored === 'orange' || stored === 'gray' || stored === 'pink') {
    return stored
  }
  return 'blue'
})()


applyTheme(bootMode, bootPalette) // BEFORE createRoot — no white flash



createRoot(document.getElementById('root')!).render(
    <BrowserRouter >
      <AuthProvider >
       <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
        </LocalizationProvider>
     </ThemeProvider>
     </AuthProvider>
    </BrowserRouter>
)
