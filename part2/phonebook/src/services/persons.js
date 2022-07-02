import axios from 'axios'

const baseUrl = 'http://localhost:3000/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  

const create = newObject => {
return axios.post(baseUrl, newObject)
}

// const update = (newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
//   }

export default {getAll, create}