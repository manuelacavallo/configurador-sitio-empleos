import styles from './InfoBox.module.css'

function InfoIcon({ variant }) {
  return (
    <svg className={styles.icon} width="16" height="16" viewBox="0 0 16 16" fill="none">
      {variant === 'info' && (
        <>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 7v4M8 5.5v0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
      {variant === 'success' && (
        <>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {variant === 'warning' && (
        <>
          <path d="M8 2L14.5 13H1.5L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M8 6v3M8 11v0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
      {variant === 'error' && (
        <>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export default function InfoBox({ children, variant = 'info', hideIcon }) {
  return (
    <div className={`${styles.box} ${styles[variant]}`}>
      {!hideIcon && <InfoIcon variant={variant} />}
      <span className={styles.text}>{children}</span>
    </div>
  )
}
