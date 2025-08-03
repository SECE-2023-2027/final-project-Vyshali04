import Link from 'next/link'
import styles from '../../styles/CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Ready to Start Tracking?</h2>
          <p>Join thousands of audiobook lovers who never lose their place again.</p>
          <div className={styles.actions}>
            <Link href="/signup" className={styles.button}>
              Start Free Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}