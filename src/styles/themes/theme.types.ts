 
export type ThemeMode = 'light' | 'dark' 
export type ThemePallete = 'blue' | 'orange' | 'gray' | 'pink'

export type BrandScale = {
    50 :string
    100 :string
    500 :string
    800 :string
    900 :string
}

export type ModeTokens = {
    bg :string
    surface :string
    surfaceMuted : string
    border : string 
    borderStrong : string
    text :string 
    textSecondary :string 
    textMuted :string 
    textInverse : string 
    overlay :string 
    shadow : string 
    errorSoft :string 
    warningSoft :string 
    successSoft : string  //14 keys
}

export type StatusTokens = {
    error : string 
    warning :string 
    success :string
}

export type CssVarMap = Record<string, string>