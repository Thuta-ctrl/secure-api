import axios from 'axios'
import { useAuthStore } from '../store/auth-store'
let isRefreshing = false

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  contentType: 'application/json',
  timeout: 100000,
  withCredentials: true,
})

api.interceptors.request.use(async (request) => {
  const AuthStore = useAuthStore()
  const token = AuthStore.getToken
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
})

api.interceptors.response.use(async (response) => {
  return response
}, async(error) => {
  const AuthStore = useAuthStore()
  if (error?.response?.status === 401 && !isRefreshing) {
    try {
      isRefreshing = true
      await AuthStore.refresh()
      return error.config
    } catch(e) {

    } finally {
      isRefreshing = false
    }
  }
  throw error
})

export { api }
