import { useId } from 'react'
import styles from './Textarea.module.css'

export default function Textarea({
  label,
  value,
  onChange,
  placeholder,
  helper,
  error,
  required,
  maxLength,
  onFocus,
  onBlur,
}) {
  const id = useId()

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        id={id}
        className={`${styles.textarea} ${error ? styles.hasError : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className={styles.footer}>
        {error && <span className={styles.error}>{error}</span>}
        {!error && helper && <span className={styles.helper}>{helper}</span>}
        {maxLength && (
          <span className={styles.counter}>
            {(value || '').length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
