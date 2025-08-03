import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import styles from '../../styles/Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return router.pathname === path
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span>📚</span>
          AudioTracker
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/dashboard" 
            className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            Dashboard
          </Link>
          
          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>Hi, {user?.name}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className={`${styles.navLink} ${styles.signupLink} ${isActive('/signup') ? styles.active : ''}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button 
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}