import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImportModal from '../components/ImportModal'
import LanguageSwitcher from '../components/ui/LanguageSwitcher'
import styles from './InstanceConnect.module.css'

export default function InstanceConnect({ onConnect, onImportAndConnect }) {
  const { t } = useTranslation()
  const [showImport, setShowImport] = useState(false)

  return (
    <div className={styles.backdrop}>
      <div className={styles.shell}>
        <div className={styles.shellHeader}>
          <h1 className={styles.shellTitle}>{t('appTitle')}</h1>
          <LanguageSwitcher />
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.titleGroup}>
              <h2 className={styles.title}>{t('landing.title')}</h2>
              <p className={styles.description}>
                {t('landing.subtitle')}
              </p>
            </div>

            <div className={styles.options}>
              <button className={styles.optionCard} onClick={onConnect}>
                <div className={styles.optionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <strong className={styles.optionTitle}>{t('landing.createTitle')}</strong>
                <span className={styles.optionDescription}>{t('landing.createDesc')}</span>
              </button>

              <button className={styles.optionCard} onClick={() => setShowImport(true)}>
                <div className={styles.optionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6M12 18v-6m-3 3l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <strong className={styles.optionTitle}>{t('landing.editTitle')}</strong>
                <span className={styles.optionDescription}>{t('landing.editDesc')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showImport && (
        <ImportModal
          onImport={onImportAndConnect}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  )
}
