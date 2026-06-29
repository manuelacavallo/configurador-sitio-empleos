import { useTranslation } from 'react-i18next'
import { useConfigurator } from '../context/ConfiguratorContext'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import FileUpload from '../components/ui/FileUpload'
import InfoBox from '../components/ui/InfoBox'
import styles from './StepCommon.module.css'

export default function JobList({ errors, setFocusArea }) {
  const { t } = useTranslation()
  const { state, dispatch } = useConfigurator()
  const { jobList } = state

  const update = (data) => dispatch({ type: 'UPDATE_JOBLIST', payload: data })

  return (
    <>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('jobList.title')}</h2>
        <p className={styles.stepDesc}>{t('jobList.desc')}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('jobList.header')}</h3>
        <div className={styles.fields}>
          <Input
            label={t('jobList.jobTitle')}
            value={jobList.title}
            onChange={(v) => update({ title: v })}
            placeholder={t('jobList.jobTitlePlaceholder')}
            clearable
            onFocus={() => setFocusArea?.('hero')}
          />
          <Textarea
            label={t('jobList.jobDesc')}
            value={jobList.description}
            onChange={(v) => update({ description: v })}
            placeholder={t('jobList.jobDescPlaceholder')}
            maxLength={500}
            onFocus={() => setFocusArea?.('hero')}
          />
          <div>
            <label className={styles.fieldLabel}>{t('jobList.image')}</label>
            <FileUpload
              value={jobList.image}
              onChange={(v) => update({ image: v })}
              helper={t('jobList.imageHelper')}
            />
            <div style={{ marginTop: 16 }}>
              <InfoBox>
                {t('jobList.imageInfo')}
              </InfoBox>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
