import { useState, useRef, useEffect } from 'react'
import styles from './SearchSelect.module.css'

export default function SearchSelect({ label, value, onChange, options, placeholder = 'Selecciona', helper }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = options.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search)
  )

  const selectedOption = options.find((o) => o.id === value)

  const handleSelect = (option) => {
    onChange(option)
    setOpen(false)
    setSearch('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange(null)
    setSearch('')
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.controlWrapper}>
        <div
          className={`${styles.control} ${open ? styles.focused : ''}`}
          onClick={() => {
            setOpen(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
        >
          {open ? (
            <input
              ref={inputRef}
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={selectedOption ? selectedOption.name : placeholder}
            />
          ) : (
            <span className={selectedOption ? styles.value : styles.placeholder}>
              {selectedOption ? selectedOption.name : placeholder}
            </span>
          )}
          <div className={styles.actions}>
            {selectedOption && !open && (
              <button type="button" className={styles.clearBtn} onClick={handleClear}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
            )}
            <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {open && (
          <div className={styles.dropdown}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>Sin resultados</div>
            ) : (
              filtered.map((option) => (
                <div
                  key={option.id}
                  className={`${styles.option} ${option.id === value ? styles.selected : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  <span className={styles.optionId}>ID: {option.id}</span>
                  <span className={styles.optionName}>{option.name}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {helper && <span className={styles.helper}>{helper}</span>}
    </div>
  )
}
