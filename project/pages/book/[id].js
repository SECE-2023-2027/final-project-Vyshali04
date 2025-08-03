import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '../../context/AuthContext'
import { useBooks } from '../../hooks/useBooks'
import Layout from '../../components/Layout/Layout'
import BookHeader from '../../components/BookDetail/BookHeader'
import ChapterList from '../../components/BookDetail/ChapterList'
import EditBookModal from '../../components/BookDetail/EditBookModal'
import styles from '../../styles/BookDetail.module.css'

export default function BookDetail() {
  const router = useRouter()
  const { id } = router.query
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { books, updateBook, deleteBook, updateChapter } = useBooks()
  const [book, setBook] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  
  useEffect(() => {
    if (id && books.length > 0) {
      const foundBook = books.find(book => book.id === id)
      setBook(foundBook)
      setLoading(false)
    } else if (id && books.length === 0) {
      
      setLoading(false)
    }
  }, [id, books])

  const updateChapterStatus = async (chapterId, completed) => {
    if (!book) return
    
    const result = await updateChapter(book.id, chapterId, completed)
    if (!result.success) {
      alert(result.error || 'Failed to update chapter')
    }
  }

  const handleUpdateBook = async (updatedBookData) => {
    const result = await updateBook(book.id, updatedBookData)
    if (result.success) {
      setBook(prev => ({ ...prev, ...updatedBookData }))
      setIsEditModalOpen(false)
    } else {
      alert(result.error || 'Failed to update book')
    }
  }

  const handleDeleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      const result = await deleteBook(book.id)
      if (result.success) {
        router.push('/dashboard')
      } else {
        alert(result.error || 'Failed to delete book')
      }
    }
  }

 
  if (authLoading) {
    return (
      <Layout>
        <div className={styles.loading}>Loading...</div>
      </Layout>
    )
  }

  
  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Loading book...</div>
      </Layout>
    )
  }

  if (!book) {
    return (
      <Layout>
        <div className={styles.loading}>Book not found</div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>{book.title} - Audiobook Chapter Tracker</title>
        <meta name="description" content={`Track progress for ${book.title} by ${book.author}`} />
      </Head>
      <Layout>
        <div className={styles.bookDetail}>
          <BookHeader 
            book={book}
            onEdit={() => setIsEditModalOpen(true)}
            onDelete={handleDeleteBook}
          />
          <ChapterList 
            chapters={book.chapters}
            onChapterToggle={updateChapterStatus}
          />
        </div>

        {isEditModalOpen && (
          <EditBookModal 
            book={book}
            onClose={() => setIsEditModalOpen(false)}
            onUpdateBook={handleUpdateBook}
          />
        )}
      </Layout>
    </>
  )
}