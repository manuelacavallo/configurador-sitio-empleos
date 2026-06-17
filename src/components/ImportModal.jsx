import { useState } from 'react'
import Button from './ui/Button'
import FileUpload from './ui/FileUpload'
import { importFromFiles } from '../utils/importConfig'
import styles from './ImportModal.module.css'

export default function ImportModal({ onImport, onClose }) {
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
      setError(e.message || 'No pudimos procesar los archivos. Verifica que sean válidos e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <span className={styles.title}>Cargar configuración</span>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <p className={styles.subtitle}>
          Sube el JSON y el ZIP que exportaste antes para retomar la edición con todo precargado.
        </p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>
              Configuración (JSON)<span className={styles.required}>*</span>
            </label>
            <FileUpload
              value={jsonValue}
              onChange={(v) => { setJsonValue(v); setError(null) }}
              accept=".json"
              fileTypesLabel="Formato: JSON"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Imágenes (ZIP) (opcional)</label>
            <FileUpload
              value={zipValue}
              onChange={(v) => { setZipValue(v); setError(null) }}
              accept=".zip"
              fileTypesLabel="Formato: ZIP"
            />
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleImport} disabled={!jsonValue || loading}>
            {loading ? 'Cargando...' : 'Cargar configuración'}
          </Button>
        </div>
      </div>
    </div>
  )
}
