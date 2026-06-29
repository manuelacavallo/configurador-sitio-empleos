import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import styles from './StepFooter.module.css'

export default function StepFooter({ onBack, onNext, nextLabel, showBack = true, disableNext = false }) {
  const { t } = useTranslation()
  const resolvedNextLabel = nextLabel ?? t('common.next')

  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        {showBack && (
          <button className={styles.backBtn} onClick={onBack}>
            {t('common.back')}
          </button>
        )}
      </div>
      <Button variant="primary" size="large" onClick={onNext} disabled={disableNext}>
        {resolvedNextLabel}
      </Button>
    </div>
  )
}
