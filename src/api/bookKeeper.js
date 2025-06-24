import api from "@/plugin/axios"

export const getBookKeepers = () => api.get('/bookkeepers')
export const getBookKeeperById = id => api.get(`/bookkeepers/${id}`)
export const createBookKeeper = data => api.post('/bookkeepers', data)
export const updateBookKeeper = (id, data) => api.put(`/bookkeepers/${id}`, data)
export const deleteBookKeeper = id => api.delete(`/bookkeepers/${id}`)