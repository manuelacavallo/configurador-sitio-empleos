import { useState } from 'react'
import ImportModal from '../components/ImportModal'
import styles from './InstanceConnect.module.css'

export default function InstanceConnect({ onConnect, onImportAndConnect }) {
  const [showImport, setShowImport] = useState(false)

  return (
    <div className={styles.backdrop}>
      <div className={styles.shell}>
        <div className={styles.shellHeader}>
          <h1 className={styles.shellTitle}>Configuración Sitio de Empleos</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.titleGroup}>
              <h2 className={styles.title}>¿Qué quieres hacer?</h2>
              <p className={styles.description}>
                Elige cómo quieres comenzar la configuración de tu Careers Site.
              </p>
            </div>

            <div className={styles.options}>
              <button className={styles.optionCard} onClick={onConnect}>
                <div className={styles.optionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <strong className={styles.optionTitle}>Crear un Careers Site desde cero</strong>
                <span className={styles.optionDescription}>Configura tu sitio desde cero paso a paso.</span>
              </button>

              <button className={styles.optionCard} onClick={() => setShowImport(true)}>
                <div className={styles.optionIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6M12 18v-6m-3 3l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <strong className={styles.optionTitle}>Editar un Careers Site existente</strong>
                <span className={styles.optionDescription}>Carga una configuración anterior para seguir editando.</span>
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
