import api from "@/plugin/axios"

export const getReaders = () => api.get('/readers')
export const getReaderById = id => api.get(`/readers/${id}`)
export const createReader = data => api.post('/readers', data)
export const updateReader = (id, data) => api.put(`/readers/${id}`, data)
export const deleteReader = id => api.delete(`/readers/${id}`)