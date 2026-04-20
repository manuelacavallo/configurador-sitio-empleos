import { useId } from 'react'
import styles from './Input.module.css'

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  helper,
  error,
  required,
  prefix,
  maxLength,
  clearable,
  onFocus,
  onBlur,
  onKeyDown,
}) {
  const id = useId()

  const handleClear = () => {
    onChange('')
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''}`}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          id={id}
          type="text"
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
        {clearable && value && (
          <button type="button" className={styles.clearBtn} onClick={handleClear}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
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
