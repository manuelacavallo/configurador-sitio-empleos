import { useHighlight } from '../../hooks/useHighlight'
import styles from './PreviewFooter.module.css'

export default function PreviewFooter({ siteName, companyUrl, highlight, focusArea }) {
  const ref = useHighlight(highlight ? 'footer' : focusArea, 'footer')

  return (
    <div ref={ref} className={styles.footer}>
      <span className={styles.powered}>Powered by <strong>Humand</strong> ©</span>
      <div className={styles.links}>
        {companyUrl && siteName && (
          <span className={styles.link}>{siteName}</span>
        )}
        <span className={styles.link}>Política de privacidad</span>
        <span className={styles.link}>Gestionar Cookies</span>
      </div>
    </div>
  )
}
