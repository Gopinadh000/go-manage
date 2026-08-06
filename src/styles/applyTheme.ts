import { buildThemeCssVariables } from "./buildTheme";
import type { ThemeMode, ThemePallete } from "./themes/theme.types";



export const applyTheme = (mode : ThemeMode, pallete : ThemePallete) => {

    if (typeof document === 'undefined'){
        return
    }
    const root = document.documentElement 

    root.setAttribute('data-theme', mode)
    root.setAttribute('data-pallete', pallete)
    root.style.colorScheme = mode 

    const vars = buildThemeCssVariables(mode, pallete)
    Object.entries(vars).forEach(([key , value])=> {
        root.style.setProperty(key , value)
    })

}