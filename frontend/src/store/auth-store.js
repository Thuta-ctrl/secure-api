import { defineStore } from 'pinia';
import { api } from '../api/axios'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    token: null,
    isAuthenticated: localStorage.getItem('isAuthenticated') || null,
    expires_in: null,
    currentUser: null
  }),
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    async login(payload) {
      try {
        return await api.post('/login', payload)
      } catch(e) {
        throw e
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } catch(e) {
        throw e
      }
    },

    async refresh() {
      try {
        const res = await api.post('refresh')
        this.token = res.data.token
        this.isAuthenticated = true
        this.expires_in = res.data.expires_in
        localStorage.setItem('isAuthenticated', true)
      } catch(e) {
        if (e.response.status === 401) {
          this.token = null
          this.isAuthenticated = null
          this.expires_in = null
          localStorage.removeItem('isAuthenticated')
          window.location.href = '/login'
        } else {
          throw e
        }
      }
    },

    async me(payload) {
      try {
        const res = await api.get('/me', payload)
        this.currentUser = res.data
      } catch(e) {
        throw e
      }
    },
  },
});
