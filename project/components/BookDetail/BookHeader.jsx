import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/BookHeader.module.css'

export default function BookHeader({ book, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      onDelete()
    }
  }

  return (
    <div className={styles.header}>
      <Link href="/dashboard" className={styles.backButton}>
        ← Back to Dashboard
      </Link>
      
      <div className={styles.content}>
        <div className={styles.cover}>
          <Image
            src={book.coverImage || 'https://via.placeholder.com/300x450/e2e8f0/64748b?text=No+Cover'}
            alt={book.title}
            width={300}
            height={450}
            className={styles.coverImage}
          />
        </div>
        
        <div className={styles.info}>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.author}>by {book.author}</p>
          
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${book.progress}%` }}
              ></div>
            </div>
            <div className={styles.progressStats}>
              <span>{book.progress}% Complete</span>
              <span>{book.chapters.filter(c => c.completed).length} of {book.chapters.length} chapters</span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button onClick={onEdit} className={styles.editButton}>
              Edit Book
            </button>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}