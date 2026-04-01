import styles from './Checkbox.module.css'

export default function Checkbox({ checked, onChange, label }) {
  const handleClick = () => {
    onChange?.(!checked)
  }

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={`${styles.box} ${checked ? styles.checked : ''}`}>
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
