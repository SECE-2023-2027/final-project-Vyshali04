import { useState } from 'react'
import styles from '../../styles/Modal.module.css'

export default function AddBookModal({ onClose, onAddBook }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverImage: '',
    totalChapters: 10
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalChapters' ? parseInt(value) || 0 : value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required'
    }

    if (formData.totalChapters < 1) {
      newErrors.totalChapters = 'Must have at least 1 chapter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAddBook(formData)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Add New Audiobook</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Book Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? styles.error : ''}
              placeholder="Enter book title"
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? styles.error : ''}
              placeholder="Enter author name"
            />
            {errors.author && <span className={styles.errorText}>{errors.author}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="totalChapters">Number of Chapters *</label>
            <input
              type="number"
              id="totalChapters"
              name="totalChapters"
              value={formData.totalChapters}
              onChange={handleChange}
              min="1"
              className={errors.totalChapters ? styles.error : ''}
            />
            {errors.totalChapters && <span className={styles.errorText}>{errors.totalChapters}</span>}
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}