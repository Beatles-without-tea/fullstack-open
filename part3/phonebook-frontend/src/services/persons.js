import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  

const create = newObject => {
return axios.post(baseUrl, newObject)
}

const update = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }

const deleteObject = (objectToDelete) => {
    return axios.delete(`${baseUrl}/${objectToDelete}`)
}

export default {getAll, create, deleteObject,update}