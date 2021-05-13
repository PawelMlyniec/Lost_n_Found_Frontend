import auth0 from 'auth0-js'
import Vue from 'vue'

// exchange the object with your own from the setup step above.
const webAuth = new auth0.WebAuth({
  domain: 'lost-n-found.eu.auth0.com',
  clientID: 'rbsGyGXbR74uHFClVpzcViYmaeFU7B0C',
  redirectUri: 'http://35.198.161.140/callback',
  // audience: 'https://' + 'lost-n-found.eu.auth0.com' + '/api/v2/',
  audience: 'http://localhost:5000',
  responseType: 'token id_token',
  scope: 'openid profile email',
})

const auth = new Vue({
  computed: {
    token: {
      get() {
        return localStorage.getItem('id_token')
      },
      set(idToken) {
        localStorage.setItem('id_token', idToken)
      },
    },
    accessToken: {
      get() {
        return localStorage.getItem('access_token')
      },
      set(accessToken) {
        localStorage.setItem('access_token', accessToken)
      },
    },
    expiresAt: {
      get() {
        return localStorage.getItem('expires_at')
      },
      set(expiresIn) {
        const expiresAt = JSON.stringify(
          expiresIn * 1000 + new Date().getTime()
        )
        localStorage.setItem('expires_at', expiresAt)
      },
    },
    user: {
      get() {
        return JSON.parse(localStorage.getItem('user'))
      },
      set(user) {
        localStorage.setItem('user', JSON.stringify(user))
      },
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt
    },
  },
  methods: {
    login() {
      webAuth.authorize()
    },
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')
        webAuth.logout({
          returnTo: 'http://35.198.161.140/', // Allowed logout URL listed in dashboard
          clientID: 'rbsGyGXbR74uHFClVpzcViYmaeFU7B0C',
        })
      })
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()
          } else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    },
  },
})

const Auth0Plugin = {
  install(Vue) {
    Vue.prototype.$auth = auth
  },
}

export default function ({}) {
  Vue.use(Auth0Plugin)
}
