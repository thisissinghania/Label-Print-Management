import jwtDecode from 'jwt-decode'

const ID_TOKEN_KEY = 'id_token'
const USER_DATA = 'user_data'

export const saveToken = (token) => {
  return window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY)
}

export const saveUser = (token) => {
  const decodedToken = jwtDecode(token)
  return window.localStorage.setItem(USER_DATA, JSON.stringify(decodedToken))
}

export const getUserData = () => {
  const userData = window.localStorage.getItem(USER_DATA)
  return JSON.parse(userData)
}

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
  window.localStorage.removeItem(USER_DATA)
  window.localStorage.clear()
}
