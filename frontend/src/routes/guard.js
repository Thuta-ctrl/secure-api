import { useAuthStore } from '../store/auth-store'

export const requiredAuth = async(to, from, next) => {
  const AuthStore = useAuthStore()
  try {
    await AuthStore.me()
    next()
  } catch(error) {
    throw error
  }
}

export const notRequiredAuth = async(to, from, next) => {
  next()
}
