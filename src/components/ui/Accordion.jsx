import { useState } from 'react'
import styles from './Accordion.module.css'

export default function Accordion({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} onClick={() => setOpen(!open)}>
        <span className={styles.title}>{title}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.open : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  )
}
