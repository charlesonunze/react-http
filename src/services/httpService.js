import axios from 'axios'

axios.interceptors.response.use(null, error => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status <= 500;

  if (expectedError) {
    console.log('Error log:', error);
    alert('Something bad happened. Post could not be deleted.')
  }

  return Promise.reject(error);
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};