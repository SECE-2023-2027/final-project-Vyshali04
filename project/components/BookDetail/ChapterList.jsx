import styles from '../../styles/ChapterList.module.css'

export default function ChapterList({ chapters, onChapterToggle }) {
  return (
    <div className={styles.chapterList}>
      <h2>Chapters</h2>
      
      <div className={styles.chapters}>
        {chapters.map(chapter => (
          <div 
            key={chapter.id} 
            className={`${styles.chapter} ${chapter.completed ? styles.completed : ''}`}
          >
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={chapter.completed}
                onChange={(e) => onChapterToggle(chapter.id, e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              
              <div className={styles.chapterInfo}>
                <span className={styles.chapterTitle}>{chapter.title}</span>
                {chapter.completed && (
                  <span className={styles.completedBadge}>✓ Completed</span>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}