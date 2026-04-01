import { useState } from 'react'
import { ConfiguratorProvider, useConfigurator } from './context/ConfiguratorContext'
import InstanceConnect from './steps/InstanceConnect'
import WizardShell from './components/layout/WizardShell'
import GeneralConfig from './steps/GeneralConfig'
import HomePage from './steps/HomePage'
import JobList from './steps/JobList'
import Export from './steps/Export'
import { validateAllSteps } from './utils/validation'
import { exportConfiguration } from './utils/exportConfig'

function ConfiguratorApp() {
  const { state, dispatch } = useConfigurator()
  const [connected, setConnected] = useState(!!state.instanceId)
  const [exporting, setExporting] = useState(false)
  const [exportResult, setExportResult] = useState(null)
  const [exportError, setExportError] = useState(null)

  if (!connected) {
    return <InstanceConnect onConnect={() => setConnected(true)} />
  }

  const handleNavigateToStep = (step) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const allErrors = validateAllSteps(state)
  const allComplete =
    Object.keys(allErrors.step0).length === 0 &&
    Object.keys(allErrors.step1).length === 0 &&
    Object.keys(allErrors.step2).length === 0

  const handleExport = async () => {
    setExporting(true)
    setExportError(null)
    try {
      const result = await exportConfiguration(state)
      setExportResult(result)
      dispatch({ type: 'SET_EXPORTED' })
    } catch (e) {
      console.error('Export failed:', e)
      setExportError('Error al exportar. Intenta nuevamente.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <WizardShell
      onClose={() => setConnected(false)}
      onExport={handleExport}
      exportDisabled={!allComplete}
      exporting={exporting}
    >
      {({ errors, setErrors, setFocusArea }) => {
        switch (state.currentStep) {
          case 0:
            return <GeneralConfig errors={errors} setFocusArea={setFocusArea} />
          case 1:
            return <HomePage errors={errors} setFocusArea={setFocusArea} />
          case 2:
            return <JobList errors={errors} setFocusArea={setFocusArea} />
          case 3:
            return (
              <Export
                onNavigateToStep={handleNavigateToStep}
                exportResult={exportResult}
                exportError={exportError}
              />
            )
          default:
            return null
        }
      }}
    </WizardShell>
  )
}

export default function App() {
  return (
    <ConfiguratorProvider>
      <ConfiguratorApp />
    </ConfiguratorProvider>
  )
}
