import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'
import {
  AUTH_LOGOUT_EVENT,
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '../../api/authToken'

type UserProps = {
  userid: string
  name: string
  tenant_id: string
}

type LoginPayload = {
  accessToken: string
  user: UserProps
  permissions?: string[]
}

type AuthContextType = {
  user: UserProps | null
  permissions: string[]
  accessToken: string | null
  login: (data: LoginPayload) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [permissions, setPermissions] = useState<string[]>([])
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const clearSession = useCallback(() => {
    removeAuthToken()
    setAccessToken(null)
    setUser(null)
    setPermissions([])
  }, [])

  // On app start: restore token from browser (if user logged in earlier)
  useEffect(() => {
    const savedToken = getAuthToken()
    if (savedToken) {
      setAccessToken(savedToken)
    }
    setIsLoading(false)
  }, [])

  // If axios gets 401, it emits this event → clear React auth state too
  useEffect(() => {
    const onForcedLogout = () => clearSession()
    window.addEventListener(AUTH_LOGOUT_EVENT, onForcedLogout)
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, onForcedLogout)
  }, [clearSession])

  const login = useCallback((data: LoginPayload) => {
    saveAuthToken(data.accessToken)
    setAccessToken(data.accessToken)
    setUser(data.user)
    setPermissions(data.permissions ?? [])
  }, [])

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  const value = useMemo(
    () => ({
      user,
      permissions,
      accessToken,
      login,
      logout,
      isLoading,
      isAuthenticated: true
    }),
    [user, permissions, accessToken, login, logout, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return authContext
}
