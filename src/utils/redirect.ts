// utils/redirect.ts
export const validateRedirect = (redirect: string | null) => {
    if (!redirect) return '/'
    try {
      const url = new URL(redirect, window.location.origin)
      if (url.origin !== window.location.origin) return '/'
      return url.pathname
    } catch {
      return '/'
    }
  }
