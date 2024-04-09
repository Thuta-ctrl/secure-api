import { defineStore } from 'pinia';
import { api } from '../api/axios'

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    token: null,
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
      } catch(e) {
        if (e.response.status === 401) {
          this.token = null
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
