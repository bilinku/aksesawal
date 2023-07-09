import axios from 'axios'
import { API_ENDPOINT } from '../config'

const api = API_ENDPOINT + '/api'
const pathImg = API_ENDPOINT + '/storage/images/'

const noAuth = axios.create({ baseURL: api});

const auth = axios.create({
  baseURL: api,
  headers: {
    'Content_Type': 'application/json',
    authorization: "Bearer " + localStorage.getItem("token"),
  }
})

const authwithFile = axios.create({
  baseURL: api,
  headers: {
    'Content_Type': 'multipart/form-data',
    authorization: "Bearer " + localStorage.getItem("token"),
  }
})


auth.interceptors.response.use(function (res) {
  return res;
}, function (error) {
  if(error.response.status === 401)
  localStorage.removeItem("token")
    
  return Promise.reject(error);
});

const instance ={
  noAuth,
  auth,
  authwithFile,
  pathImg
}

export default instance