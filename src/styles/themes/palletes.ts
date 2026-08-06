import type { BrandScale, ThemePallete } from "./theme.types";

/** 
 * Brand palettes only -blue,orange, light pink, gray.
 * Keep the scale small : 50/ 100 / 500 /800 /900
 */

export const brandPalettes : Record<ThemePallete , BrandScale>={
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    500: '#f97316',
    800: '#9a3412',
    900: '#7c2d12',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    800: '#1f2937',
    900: '#111827',
  },
   pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    500: '#ec4899',
    800: '#9d174d',
    900: '#831843',
  },
}

/** Secondary accent paired with each primary pallete */
export const secondaryForPalette : Record<ThemePallete , ThemePallete>={
    blue: "blue",
    orange: "blue",
    gray: "blue",
    pink: "blue"
}

export const palleteLabels : Record<ThemePallete , string>={
    blue: "Blue",
    orange: "Orange",
    gray: "Gray",
    pink: "Light Pink"
}