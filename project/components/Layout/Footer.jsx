import styles from '../../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>AudioTracker</h3>
            <p>Track your audiobook journey, chapter by chapter.</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#support">Support</a>
            </div>
            
            <div className={styles.column}>
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#privacy">Privacy</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2025 AudioTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}