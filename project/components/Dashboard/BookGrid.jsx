import BookCard from './BookCard'
import styles from '../../styles/BookGrid.module.css'

export default function BookGrid({ books, onDeleteBook }) {
  if (books.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📚</div>
        <h3>No audiobooks yet</h3>
        <p>Start building your library by adding your first audiobook!</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <BookCard 
          key={book.id}
          book={book}
          onDelete={onDeleteBook}
        />
      ))}
    </div>
  )
}