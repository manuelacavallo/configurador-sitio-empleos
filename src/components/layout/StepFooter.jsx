import Button from '../ui/Button'
import styles from './StepFooter.module.css'

export default function StepFooter({ onBack, onNext, nextLabel = 'Siguiente', showBack = true, disableNext = false }) {
  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        {showBack && (
          <button className={styles.backBtn} onClick={onBack}>
            Atrás
          </button>
        )}
      </div>
      <Button variant="primary" size="large" onClick={onNext} disabled={disableNext}>
        {nextLabel}
      </Button>
    </div>
  )
}
