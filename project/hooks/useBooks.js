import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export const useBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchBooks = async () => {
    if (!token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBooks(data.books)
        setError(null)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch books')
      }
    } catch (err) {
      console.error('Error fetching books:', err)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const addBook = async (bookData) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
      })

      const data = await response.json()

      if (response.ok) {
        setBooks(prev => [data.book, ...prev])
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Error adding book:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const updateBook = async (bookId, updateData) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
       
        setBooks(prev => prev.map(book => 
          book.id === bookId ? { ...book, ...updateData } : book
        ))
        return { success: true }
      } else {
        const data = await response.json()
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Error updating book:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setBooks(prev => prev.filter(book => book.id !== bookId))
        return { success: true }
      } else {
        const data = await response.json()
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error('Error deleting book:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const updateChapter = async (bookId, chapterId, completed) => {
    try {
      const response = await fetch(`/api/books/${bookId}/chapters`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ chapterId, completed })
      })

      if (response.ok) {
        const data = await response.json()
        
        
        setBooks(prev => prev.map(book => {
          if (book.id === bookId) {
            const updatedChapters = book.chapters.map(chapter =>
              chapter.id === chapterId ? { ...chapter, completed } : chapter
            )
            return {
              ...book,
              chapters: updatedChapters,
              progress: data.progress
            }
          }
          return book
        }))
        
        return { success: true }
      } else {
        const errorData = await response.json()
        return { success: false, error: errorData.error }
      }
    } catch (error) {
      console.error('Error updating chapter:', error)
      return { success: false, error: 'Network error' }
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [token])

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    updateChapter
  }
}