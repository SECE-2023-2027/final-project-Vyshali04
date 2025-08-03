import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/BookCard.module.css'

export default function BookCard({ book, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      onDelete(book.id)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.menuContainer}>
        <button 
          className={styles.menuButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          ⋮
        </button>
        {showMenu && (
          <div className={styles.menu}>
            <Link href={`/book/${book.id}`} className={styles.menuItem}>
              View Details
            </Link>
            <button onClick={handleDelete} className={`${styles.menuItem} ${styles.delete}`}>
              Delete
            </button>
          </div>
        )}
      </div>

      <Link href={`/book/${book.id}`} className={styles.cardLink}>
        <div className={styles.cover}>
          <Image
            src={book.coverImage || 'https://via.placeholder.com/200x300/e2e8f0/64748b?text=No+Cover'}
            alt={book.title}
            width={200}
            height={300}
            className={styles.coverImage}
          />
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>by {book.author}</p>
          
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${book.progress}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>{book.progress}% complete</span>
          </div>
        </div>
      </Link>
    </div>
  )
}