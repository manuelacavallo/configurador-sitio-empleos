import { useTranslation } from 'react-i18next'
import { useConfigurator } from '../context/ConfiguratorContext'
import Input from '../components/ui/Input'
import FileUpload from '../components/ui/FileUpload'
import Button from '../components/ui/Button'
import styles from './StepCommon.module.css'

export default function GeneralConfig({ errors, setFocusArea }) {
  const { t } = useTranslation()
  const { state, dispatch } = useConfigurator()
  const { general } = state

  const update = (data) => dispatch({ type: 'UPDATE_GENERAL', payload: data })

  const handleSlugChange = (val) => {
    const slug = val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 30)
    update({ urlSlug: slug })
  }

  return (
    <>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('generalConfig.title')}</h2>
        <p className={styles.stepDesc}>{t('generalConfig.desc')}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('generalConfig.basicInfo')}</h3>
        <div className={styles.fields}>
          <Input
            label={t('generalConfig.siteName')}
            required
            value={general.siteName}
            onChange={(v) => update({ siteName: v })}
            placeholder={t('generalConfig.siteNamePlaceholder')}
            helper={t('generalConfig.siteNameHelper')}
            error={errors?.['general.siteName']}
            onFocus={() => setFocusArea?.('browser-tab')}
            onBlur={() => setFocusArea?.(null)}
          />
          <Input
            label={t('generalConfig.urlSlug')}
            required
            value={general.urlSlug}
            onChange={handleSlugChange}
            placeholder={t('generalConfig.urlSlugPlaceholder')}
            prefix="jobs.humand.co/"
            helper={t('generalConfig.urlSlugHelper')}
            maxLength={30}
            clearable
            error={errors?.['general.urlSlug']}
            onFocus={() => setFocusArea?.('browser-url')}
            onBlur={() => setFocusArea?.(null)}
          />
          <div>
            <label className={styles.fieldLabel}>{t('generalConfig.favicon')}</label>
            <FileUpload
              value={general.favicon}
              onChange={(v) => update({ favicon: v })}
              helper={t('generalConfig.faviconHelper')}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('generalConfig.header')}</h3>
        <p className={styles.sectionDesc}>{t('generalConfig.headerDesc')}</p>
        <div className={styles.fields}>
          <div>
            <label className={styles.fieldLabel}>
              {t('generalConfig.logo')}<span className={styles.required}>*</span>
            </label>
            <FileUpload
              value={general.logo}
              onChange={(v) => update({ logo: v })}
              helper={t('generalConfig.logoHelper')}
              error={errors?.['general.logo']}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>{t('generalConfig.footer')}</h3>
        <p className={styles.sectionDesc}>{t('generalConfig.footerDesc')}</p>
        <div className={styles.fields}>
          <Input
            label={t('generalConfig.privacyUrl')}
            required
            value={general.privacyUrl}
            onChange={(v) => update({ privacyUrl: v })}
            placeholder={t('generalConfig.privacyUrlPlaceholder')}
            error={errors?.['general.privacyUrl']}
            onFocus={() => setFocusArea?.('footer')}
            onBlur={() => setFocusArea?.(null)}
          />
          <Input
            label={t('generalConfig.companyUrl')}
            value={general.companyUrl}
            onChange={(v) => update({
              companyUrl: v,
              ...(v ? {} : { footerWebsiteText: '', showFooterWebsiteText: false }),
            })}
            placeholder={t('generalConfig.privacyUrlPlaceholder')}
            clearable
            onFocus={() => setFocusArea?.('footer')}
            onBlur={() => setFocusArea?.(null)}
          />
          {general.companyUrl && (
            (general.showFooterWebsiteText ?? !!general.footerWebsiteText) ? (
              <div>
                <div className={styles.fieldRowHeader}>
                  <span className={styles.fieldRowLabel}>{t('generalConfig.footerWebsiteTextFieldLabel')}</span>
                  <Button
                    variant="link"
                    onClick={() => update({ showFooterWebsiteText: false, footerWebsiteText: '' })}
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
                <Input
                  value={general.footerWebsiteText}
                  onChange={(v) => update({ footerWebsiteText: v })}
                  placeholder={general.siteName ? `${general.siteName} website` : t('generalConfig.footerWebsiteTextPlaceholder')}
                  clearable
                  onFocus={() => setFocusArea?.('footer')}
                  onBlur={() => setFocusArea?.(null)}
                />
              </div>
            ) : (
              <div className={styles.fieldRowHeader}>
                <span className={styles.infoRow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 14.5L14.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M11 6.5l1.19-1.19a4 4 0 015.66 5.66L16.5 12.5M13 17.5l-1.19 1.19a4 4 0 01-5.66-5.66L7.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t('generalConfig.footerWebsiteTextDefaultInfo')}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => update({
                    showFooterWebsiteText: true,
                    footerWebsiteText: general.footerWebsiteText || `${general.siteName} website`,
                  })}
                >
                  {t('generalConfig.footerWebsiteTextCustomize')}
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}
