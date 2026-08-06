import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { applyTheme, type ThemeMode, type ThemePallete } from "../../../styles";

type ThemeContextValue = {
    mode: ThemeMode
    palette: ThemePallete
    setMode: (mode: ThemeMode) => void
    setPallete: (palette: ThemePallete) => void
    toggleMode: () => void
}

const STORAGE_MODE = 'go-manage-mode'
const STORAGE_PALETTE = 'go-manage-pallete'

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getStoredMode =()=>{
   if(window.localStorage){
    const storedMode =  window.localStorage.getItem(STORAGE_MODE)
    return storedMode ? storedMode : "light"
   }
}

const getStorePallete =()=>{
  if(window.localStorage){
    const storedMode =  window.localStorage.getItem(STORAGE_PALETTE)
    return storedMode ?  storedMode : "blue"
   }

}

export const ThemeProvider = ({children}: {children : ReactNode})=>{
    const [mode , setModeState]=useState<ThemeMode>(()=> getStoredMode())
    const [palette , setPaletteState] = useState<ThemePallete>(()=> getStorePallete())


  const toggleMode =()=>{
   setModeState((prev: string) =>
    prev === "light" ? "dark" : "light"
    );
  }

const setMode = (mode: ThemeMode) => {
    setModeState(mode);
};

const setPallete = (palette: ThemePallete) => {
  console.log(palette , "palette")
    setPaletteState(palette);
};


 useEffect(()=>{
     applyTheme(mode, palette)
    localStorage.setItem(STORAGE_MODE, mode)
    localStorage.setItem(STORAGE_PALETTE, palette)
 },[mode, palette])

  const value = useMemo(() => ({
    mode,
    palette,
    setMode,
    setPallete,
    toggleMode,
}), [mode, palette]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}


export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};
