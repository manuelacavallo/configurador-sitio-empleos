import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './ui/Button'
import FileUpload from './ui/FileUpload'
import { importFromFiles } from '../utils/importConfig'
import styles from './ImportModal.module.css'

export default function ImportModal({ onImport, onClose }) {
  const { t } = useTranslation()
  const [jsonValue, setJsonValue] = useState(null)
  const [zipValue, setZipValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleImport = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await importFromFiles({
        jsonFile: jsonValue?.file ?? null,
        zipFile: zipValue?.file ?? null,
      })
      onImport(result)
      onClose()
    } catch (e) {
      setError(e.message || t('importModal.errorGeneric'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <span className={styles.title}>{t('importModal.title')}</span>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className={styles.subtitle}>
          {t('importModal.subtitle')}
        </p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>
              {t('importModal.jsonLabel')}<span className={styles.required}>*</span>
            </label>
            <FileUpload
              value={jsonValue}
              onChange={(v) => { setJsonValue(v); setError(null) }}
              accept=".json"
              fileTypesLabel={t('importModal.jsonFormat')}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>{t('importModal.zipLabel')}</label>
            <FileUpload
              value={zipValue}
              onChange={(v) => { setZipValue(v); setError(null) }}
              accept=".zip"
              fileTypesLabel={t('importModal.zipFormat')}
            />
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" onClick={handleImport} disabled={!jsonValue || loading}>
            {loading ? t('common.loading') : t('importModal.submit')}
          </Button>
        </div>
      </div>
    </div>
  )
}
