import { useCookies } from 'react-cookie'

export function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  function saveToken(token: string) {
    setCookie('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  function clearToken() {
    removeCookie('token', {
      path: '/',
    })
  }

  const token = cookies.token ? String(cookies.token) : null

  return {
    token,
    saveToken,
    clearToken,
  }
}
