/**
 * After login, the backend gives an access token (JWT string).
 * We save it in the browser so:
 *  1) Refreshing the page keeps you logged in
 *  2) Axios can attach it to every API call as: Authorization: Bearer <token>
 *
 * AuthContext is responsible for WHEN to save/remove.
 * Axios only READS it for request headers.
 */

const AUTH_TOKEN_KEY = 'go_manage_access_token'

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function saveAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function removeAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

/** Fired when API returns 401 — AuthContext listens and clears React state */
export const AUTH_LOGOUT_EVENT = 'go-manage:logout'

export function emitLogout(): void {
  removeAuthToken()
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT))
}
