import axios from 'axios'
import { BASE_URL } from './config'
import router from '../router'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_FLAG === 'pro') {
    axios.defaults.baseURL = BASE_URL
  } else {
    axios.defaults.baseURL = BASE_URL
  }
} else {
  axios.defaults.baseURL = BASE_URL
}

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          setTimeout(() => {
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break

        case 404:
          break
      }
      return Promise.reject(error.response)
    }
  }
)

/**
   * get
   * @param url
   * @param data
   * @returns {Promise}
   */
export function get (url, params = {}, responseType = 'json') {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      responseType
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
   * post
   * @param url
   * @param data
   * @returns {Promise}
   */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
   * delete
   * @param url
   * @param data
   * @returns {Promise}
   */
export function deletes (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
   * put
   * @param url
   * @param data
   * @returns {Promise}
   */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
