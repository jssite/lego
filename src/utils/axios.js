import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const ajax = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000/*,
  withCredentials: true*/
})

ajax.interceptors.request.use(config => {
  // console.log(config);
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
},
error => {
  // console.log(error)
  return Promise.reject(error)
}
)
ajax.interceptors.response.use(response => {
  const { status, data, statusText } = response
  if (status == 200) {
    const { status, errorCode, message } = data
    if (status == 'FAILED') {
      if (errorCode === 401 || errorCode === 50012 || errorCode === 50014) {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } else {
        Message({
          message: message || 'Error',
          type: 'error',
          duration: 2 * 1000
        })
      }
    }
    return data
  } else {
    Message({
      message: statusText || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
  }
}, error => {
  // console.log('err' + error) // for debug
  Message({
    message: '请求数据异常，重新加载页面！', // error.message
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default ajax
