import api from "@/plugin/axios"

export const getBorrowings = () => api.get('/borrowbooks')
export const getBorrowingById = id => api.get(`/borrowbooks/${id}`)
export const createBorrowing = data => api.post('/borrowbooks', data)
export const updateBorrowing = (id, data) => api.put(`/borrowbooks/${id}`, data)
export const deleteBorrowing = id => api.delete(`/borrowbooks/${id}`)
export const returnBorrowing = id => api.patch(`/borrowbooks/${id}/return`)