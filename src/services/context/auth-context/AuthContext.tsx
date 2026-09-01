import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { apiClient } from "../../api/axios.instance";
import { AUTH_LOGOUT_EVENT } from "../../api/authToken";

export type UserProps = {
  userPublicId: string;
  firstName: string;
  lastName: string;
  email: string;
  userStatus: string;
  tenantId: string;
  tenantName: string;
  tenantSlug: string;
  userRoleId?: number;
};

/** Matches backend login /auth/me `data` payload */
export type SessionUserData = UserProps & {
  userpermissions?: string[];
};

type AuthState = {
  user: UserProps | null;
  userpermissions: string[];
  isLoading: boolean;
};

type AuthContextType = {
  user: UserProps | null;
  permissions: string[];
  login: (data: SessionUserData) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

type ApiEnvelope<T> = {
  status: boolean;
  statusMessage?: string;
  data?: T;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // isLoading starts TRUE so ProtectedRoutes wait for /auth/me
  // instead of instantly bouncing to /login on refresh.
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    userpermissions: [],
    isLoading: true,
  });

  const clearSession = useCallback(() => {
    setAuthState({
      user: null,
      userpermissions: [],
      isLoading: false,
    });
  }, []);

  const applySession = useCallback((data: SessionUserData) => {
    const { userpermissions = [], ...user } = data;
    setAuthState({
      user,
      userpermissions,
      isLoading: false,
    });
  }, []);

  /**
   * On every full page load / refresh:
   * 1. Browser automatically sends the httpOnly cookie (withCredentials).
   * 2. Backend verifies JWT and returns the user.
   * 3. We put that user into React state — UI never reads the JWT itself.
   */
  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      try {
        const { data: body } = await apiClient.get<ApiEnvelope<SessionUserData>>(
          "/auth/me",
        );

        if (cancelled) return;

        if (body?.status && body.data) {
          applySession(body.data);
        } else {
          clearSession();
        }
      } catch {
        if (!cancelled) clearSession();
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [applySession, clearSession]);

  // Axios 401 interceptor fires this event — clear React session
  useEffect(() => {
    const onForcedLogout = () => clearSession();
    window.addEventListener(AUTH_LOGOUT_EVENT, onForcedLogout);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, onForcedLogout);
  }, [clearSession]);

  const login = useCallback(
    (data: SessionUserData) => {
      applySession(data);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Still clear local session even if network fails
    } finally {
      clearSession();
    }
  }, [clearSession]);

  // Cookie auth: authenticated means we have a user from login or /auth/me.
  // We do NOT store accessToken in JS — httpOnly cookie holds the JWT.
  const isAuthenticated = authState.user !== null;

  const value = useMemo(
    () => ({
      user: authState.user,
      permissions: authState.userpermissions,
      login,
      logout,
      isAuthenticated,
      isLoading: authState.isLoading,
    }),
    [authState, login, logout, isAuthenticated],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return authContext;
};
