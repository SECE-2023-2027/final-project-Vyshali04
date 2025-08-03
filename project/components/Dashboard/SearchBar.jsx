import styles from '../../styles/SearchBar.module.css'

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIcon}>🔍</div>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  )
}