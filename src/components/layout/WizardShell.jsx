import { useState } from 'react'
import { useConfigurator } from '../../context/ConfiguratorContext'
import Sidebar from './Sidebar'
import PreviewPanel from './PreviewPanel'
import StepFooter from './StepFooter'
import Button from '../ui/Button'
import { validateStep } from '../../utils/validation'
import styles from './WizardShell.module.css'

export default function WizardShell({ children, onClose, onExport, exportDisabled, exporting }) {
  const { state, dispatch, saveDraft } = useConfigurator()
  const [errors, setErrors] = useState({})
  const [focusArea, setFocusArea] = useState(null)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)

  const handleNext = () => {
    if (state.currentStep < 3) {
      setErrors({})
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 })
    }
  }

  const handleBack = () => {
    if (state.currentStep > 0) {
      setErrors({})
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 })
    }
  }



  const handleClose = () => {
    if (state.dirty) {
      setShowCloseConfirm(true)
    } else {
      onClose?.()
    }
  }

  const handleSaveDraft = async () => {
    await saveDraft()
  }

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Configuración Sitio de Empleos</h1>
        <div className={styles.headerActions}>
          <Button variant="secondary" onClick={handleSaveDraft}>
            Guardar borrador
          </Button>
          <button className={styles.closeBtn} onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <Sidebar />
        <div className={styles.rightContainer}>
          <div className={styles.rightContent}>
            <div className={state.currentStep === 3 ? styles.configPanelWide : styles.configPanel}>
              {typeof children === 'function' ? children({ errors, setErrors, setFocusArea }) : children}
            </div>
            {state.currentStep < 3 && <PreviewPanel focusArea={focusArea} />}
          </div>
          <StepFooter
            onBack={handleBack}
            onNext={state.currentStep === 3 ? onExport : handleNext}
            showBack={state.currentStep > 0}
            nextLabel={
              state.currentStep === 3
                ? (exporting ? 'Exportando...' : state.exported ? 'Volver a exportar' : 'Exportar')
                : 'Siguiente'
            }
            disableNext={state.currentStep === 3 ? (exportDisabled || exporting) : false}
          />
        </div>
      </div>

      {showCloseConfirm && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h3>Tienes cambios sin guardar</h3>
            <p>¿Deseas salir sin guardar?</p>
            <div className={styles.dialogActions}>
              <Button variant="secondary" onClick={() => setShowCloseConfirm(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => onClose?.()}>
                Salir sin guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
