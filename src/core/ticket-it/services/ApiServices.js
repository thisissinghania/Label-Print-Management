import axios from 'axios'
import { BASE_URL } from '@/store/ticket-it/BaseUrl'
import { getToken } from '@/core/ticket-it/services/JWTService'

const ApiServices = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json'
  }
})

ApiServices.interceptors.request.use(
  (config) => {
    const authToken = getToken()
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default ApiServices
