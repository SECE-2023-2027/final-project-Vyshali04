import { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import { useBooks } from '../hooks/useBooks'
import Layout from '../components/Layout/Layout'
import BookGrid from '../components/Dashboard/BookGrid'
import AddBookModal from '../components/Dashboard/AddBookModal'
import SearchBar from '../components/Dashboard/SearchBar'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { books, loading, error, addBook, deleteBook } = useBooks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

 
  const filteredBooks = useMemo(() => {
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [books, searchTerm])

  const handleAddBook = async (bookData) => {
    const result = await addBook(bookData)
    if (result.success) {
      setIsModalOpen(false)
    } else {
      alert(result.error || 'Failed to add book')
    }
  }

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const result = await deleteBook(bookId)
      if (!result.success) {
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

  return (
    <>
      <Head>
        <title>Dashboard - Audiobook Chapter Tracker</title>
        <meta name="description" content="Manage your audiobook collection" />
      </Head>
      <Layout>
        <div className={styles.dashboard}>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1>My Audiobooks</h1>
              <p>Track your listening progress</p>
            </div>
            <button 
              className={styles.addButton}
              onClick={() => setIsModalOpen(true)}
            >
              Add New Book
            </button>
          </div>

          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {loading ? (
            <div className={styles.loading}>Loading your books...</div>
          ) : error ? (
            <div className={styles.error}>Error: {error}</div>
          ) : (
            <BookGrid 
              books={filteredBooks}
              onDeleteBook={handleDeleteBook}
            />
          )}

          {isModalOpen && (
            <AddBookModal 
              onClose={() => setIsModalOpen(false)}
              onAddBook={handleAddBook}
            />
          )}
        </div>
      </Layout>
    </>
  )
}