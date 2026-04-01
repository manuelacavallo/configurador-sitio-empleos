import styles from './Button.module.css'

export default function Button({ children, variant = 'primary', size, disabled, onClick, fullWidth, type = 'button' }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${size === 'large' ? styles.large : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
