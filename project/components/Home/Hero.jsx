import Link from 'next/link'
import styles from '../../styles/Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Track Your Audiobook Progress
            <span className={styles.highlight}> Chapter by Chapter</span>
          </h1>
          
          <p className={styles.description}>
            Never lose track of where you are in your favorite audiobooks. 
            Organize your library, mark completed chapters, and see your reading progress at a glance.
          </p>
          
          <div className={styles.actions}>
            <Link href="/signup" className={styles.primaryButton}>
              Get Started Free
            </Link>
            <Link href="/dashboard" className={styles.secondaryButton}>
              View Demo
            </Link>
          </div>
        </div>
        
        <div className={styles.visual}>
          <div className={styles.bookStack}>
            <div className={styles.book}></div>
            <div className={styles.book}></div>
            <div className={styles.book}></div>
          </div>
        </div>
      </div>
    </section>
  )
}