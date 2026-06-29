import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useConfigurator } from '../../context/ConfiguratorContext'
import Sidebar from './Sidebar'
import PreviewPanel from './PreviewPanel'
import StepFooter from './StepFooter'
import Button from '../ui/Button'
import ImportModal from '../ImportModal'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { validateStep, isStepDisabled } from '../../utils/validation'
import styles from './WizardShell.module.css'

export default function WizardShell({ children, onClose, onExport, exportDisabled, exporting }) {
  const { state, dispatch } = useConfigurator()
  const { t } = useTranslation()
  const [errors, setErrors] = useState({})
  const [focusArea, setFocusArea] = useState(null)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)
  const [showImport, setShowImport] = useState(false)

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

  const handleImport = (importedState) => {
    dispatch({
      type: 'LOAD_STATE',
      payload: { ...importedState, currentStep: 0, exported: false },
    })
  }

  return (
    <div className={styles.shell}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{t('appTitle')}</h1>
        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <Button variant="secondary" onClick={() => setShowImport(true)}>
            {t('header.loadFile')}
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
                ? (exporting ? t('common.exporting') : state.exported ? t('common.reexport') : t('common.export'))
                : t('common.next')
            }
            disableNext={state.currentStep === 3
              ? (exportDisabled || exporting)
              : (isStepDisabled(state.currentStep, state)
                  ? false
                  : Object.keys(validateStep(state.currentStep, state)).length > 0)
            }
          />
        </div>
      </div>

      {showImport && (
        <ImportModal onImport={handleImport} onClose={() => setShowImport(false)} />
      )}

      {showCloseConfirm && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h3>{t('header.unsavedTitle')}</h3>
            <p>{t('header.unsavedDesc')}</p>
            <div className={styles.dialogActions}>
              <Button variant="secondary" onClick={() => setShowCloseConfirm(false)}>
                {t('common.cancel')}
              </Button>
              <Button variant="primary" onClick={() => onClose?.()}>
                {t('header.exitWithout')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
