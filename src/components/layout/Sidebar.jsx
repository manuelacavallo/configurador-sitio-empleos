import { useTranslation } from 'react-i18next'
import { useConfigurator } from '../../context/ConfiguratorContext'
import { isStepComplete, isStepDisabled } from '../../utils/validation'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const { state, dispatch } = useConfigurator()
  const { t } = useTranslation()

  const STEPS = [
    { label: t('sidebar.generalConfig'), step: 0 },
    { label: t('sidebar.homePage'), step: 1 },
    { label: t('sidebar.jobList'), step: 2 },
    { label: t('sidebar.export'), step: 3 },
  ]

  return (
    <nav className={styles.sidebar}>
      {STEPS.map(({ label, step }) => {
        const isActive = state.currentStep === step
        const disabled = step < 3 && isStepDisabled(step, state)
        const isComplete = step < 3 && !disabled && isStepComplete(step, state) && state.currentStep > step
        const isExportComplete = step === 3 && state.exported

        return (
          <button
            key={step}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => dispatch({ type: 'SET_STEP', payload: step })}
          >
            {(isComplete || isExportComplete) && (
              <svg className={styles.check} width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="#F1F4FD" stroke="#C5D4F8" strokeWidth="1" />
                <path d="M8 12l3 3 5-5" stroke="#29317F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span className={styles.label}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
