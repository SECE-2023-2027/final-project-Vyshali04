import styles from '../../styles/Features.module.css'

export default function Features() {
  const features = [
    {
      icon: '📚',
      title: 'Organize Your Library',
      description: 'Keep all your audiobooks in one place with cover images, author info, and custom notes.'
    },
    {
      icon: '✅',
      title: 'Chapter-by-Chapter Tracking',
      description: 'Mark individual chapters as complete and see your progress through each book.'
    },
    {
      icon: '📊',
      title: 'Progress Visualization',
      description: 'Beautiful progress bars and statistics to visualize your listening journey.'
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Quickly find any book in your collection by title, author, or genre.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Access your audiobook tracker on any device - desktop, tablet, or mobile.'
    },
    {
      icon: '🎯',
      title: 'Reading Goals',
      description: 'Set and track your audiobook completion goals to stay motivated.'
    }
  ]

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Everything You Need to Track Your Audiobooks</h2>
          <p>Powerful features designed to enhance your listening experience</p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}