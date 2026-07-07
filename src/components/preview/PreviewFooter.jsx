import { useTranslation } from 'react-i18next'
import { useHighlight } from '../../hooks/useHighlight'
import styles from './PreviewFooter.module.css'

export default function PreviewFooter({ siteName, companyUrl, footerWebsiteText, highlight, focusArea }) {
  const { t } = useTranslation()
  const ref = useHighlight(highlight ? 'footer' : focusArea, 'footer')

  return (
    <div ref={ref} className={styles.footer}>
      <span className={styles.powered}>Powered by <strong>Humand</strong> ©</span>
      <div className={styles.links}>
        <span className={styles.link}>{t('preview.privacyPolicy')}</span>
        {companyUrl && siteName && (
          <span className={styles.link}>{footerWebsiteText || `${siteName} website`}</span>
        )}
      </div>
    </div>
  )
}
