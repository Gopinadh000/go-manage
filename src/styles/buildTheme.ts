import type { CssVarMap, ThemeMode, ThemePallete } from "./themes/theme.types";
import { brandPalettes, secondaryForPalette } from "./themes/palletes";
import { modePalettes , statusColors } from "./themes/modes";



export const buildThemeCssVariables =(mode : ThemeMode , pallete : ThemePallete): CssVarMap =>{
    const primary = brandPalettes[pallete]
    const secondary = brandPalettes[secondaryForPalette[pallete]]
    const surfaces = modePalettes[mode]

    return {
        '--app-primary-50': primary[50],
        '--app-primary-100' : primary[100],
        '--app-primary-500' : primary[500],
        '--app-primary-800' : primary[800],
        '--app-primary-900' : primary[900],

        '--app-secondary-50' : secondary[50],
        '--app-secondary-100' : secondary[100],
        '--app-secondary-500' : secondary[500],
        '--app-secondary-800' : secondary[800],
        '--app-secondary-900' : secondary[900],

        '--app-bg' : surfaces.bg,
        '--app-surface' : surfaces.surface,
        '--app-surface-muted' : surfaces.border,
        '--app-border': surfaces.border,
        '--app-border-strong': surfaces.borderStrong,

        '--app-text': surfaces.text,
        '--app-text-secondary': surfaces.textSecondary,
        '--app-text-muted': surfaces.textMuted,
        '--app-text-inverse': surfaces.textInverse,
    
        '--app-overlay': surfaces.overlay,
        '--app-shadow': surfaces.shadow,

        '--app-error': statusColors.error,
        '--app-error-soft': surfaces.errorSoft,

        '--app-warning': statusColors.warning,
        '--app-warning-soft': surfaces.warningSoft,

        '--app-success': statusColors.success,
        '--app-success-soft': surfaces.successSoft,
    }
}