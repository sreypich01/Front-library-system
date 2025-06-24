import api from "@/plugin/axios"

export const getBorrowings = () => api.get('/borrow-books')
export const getBorrowingById = id => api.get(`/borrow-books/${id}`)
export const createBorrowing = data => api.post('/borrow-books', data)
export const updateBorrowing = (id, data) => api.put(`/borrow-books/${id}`, data)
export const deleteBorrowing = id => api.delete(`/borrow-books/${id}`)
export const returnBorrowing = id => api.patch(`/borrow-books/${id}/return`)