import styles from './Toggle.module.css'

export default function Toggle({ checked, onChange, label, description, bare }) {
  if (bare) {
    return (
      <div className={`${styles.track} ${checked ? styles.active : ''}`} onClick={() => onChange(!checked)} style={{ cursor: 'pointer' }}>
        <div className={styles.thumb} />
      </div>
    )
  }

  return (
    <div className={styles.wrapper} onClick={() => onChange(!checked)}>
      <div className={styles.content}>
        {label && <span className={styles.label}>{label}</span>}
        {description && <span className={styles.description}>{description}</span>}
      </div>
      <div className={`${styles.track} ${checked ? styles.active : ''}`}>
        <div className={styles.thumb} />
      </div>
    </div>
  )
}
