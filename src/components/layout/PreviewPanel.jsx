import { useState } from 'react'
import { useConfigurator } from '../../context/ConfiguratorContext'
import BrowserFrame from '../preview/BrowserFrame'
import PreviewGeneral from '../preview/PreviewGeneral'
import PreviewHome from '../preview/PreviewHome'
import PreviewJobList from '../preview/PreviewJobList'
import Badge from '../ui/Badge'
import styles from './PreviewPanel.module.css'

export default function PreviewPanel({ focusArea }) {
  const [viewport, setViewport] = useState('desktop')
  const { state } = useConfigurator()
  const { general } = state

  const url = general.urlSlug
    ? `https://jobs.humand.co/${general.urlSlug}`
    : 'https://jobs.humand.co/tu-empresa'

  const tabTitle = general.siteName || 'Nombre del sitio'

  const renderPreview = () => {
    switch (state.currentStep) {
      case 0:
        return <PreviewGeneral focusArea={focusArea} />
      case 1:
        return <PreviewHome focusArea={focusArea} />
      case 2:
        return <PreviewJobList focusArea={focusArea} />
      default:
        return null
    }
  }

  if (state.currentStep === 3) return null

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>Vista previa</span>
          {state.currentStep > 0 && <Badge>Los datos son ilustrativos</Badge>}
        </div>
        <div className={styles.viewportToggle}>
          <button
            className={`${styles.vpBtn} ${viewport === 'desktop' ? styles.vpActive : ''}`}
            onClick={() => setViewport('desktop')}
            title="Desktop"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H16V19H17C17.5523 19 18 19.4477 18 20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20C6 19.4477 6.44772 19 7 19H8V17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V5C2 4.46957 2.21071 3.96086 2.58579 3.58579ZM10 17V19H14V17H10ZM4 15V5L20 5V15H4Z" fill="currentColor" />
            </svg>
          </button>
          <button
            className={`${styles.vpBtn} ${viewport === 'mobile' ? styles.vpActive : ''}`}
            onClick={() => setViewport('mobile')}
            title="Mobile"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 4C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V19C7 19.2652 7.10536 19.5196 7.29289 19.7071C7.48043 19.8946 7.73478 20 8 20H16C16.2652 20 16.5196 19.8946 16.7071 19.7071C16.8946 19.5196 17 19.2652 17 19V5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H14C14 4.55228 13.5523 5 13 5H11C10.4477 5 10 4.55228 10 4H8ZM5.87868 2.87868C6.44129 2.31607 7.20435 2 8 2H16C16.7956 2 17.5587 2.31607 18.1213 2.87868C18.6839 3.44129 19 4.20435 19 5V19C19 19.7957 18.6839 20.5587 18.1213 21.1213C17.5587 21.6839 16.7957 22 16 22H8C7.20435 22 6.44129 21.6839 5.87868 21.1213C5.31607 20.5587 5 19.7957 5 19V5C5 4.20435 5.31607 3.44129 5.87868 2.87868ZM12 16C12.5523 16 13 16.4477 13 17V17.01C13 17.5623 12.5523 18.01 12 18.01C11.4477 18.01 11 17.5623 11 17.01V17C11 16.4477 11.4477 16 12 16Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.previewArea}>
        <div
          className={styles.previewFrame}
          style={{ maxWidth: viewport === 'mobile' ? 375 : '100%' }}
        >
          <BrowserFrame url={url} tabTitle={tabTitle} favicon={general.favicon} focusArea={focusArea}>
            {renderPreview()}
          </BrowserFrame>
        </div>
      </div>
    </div>
  )
}
