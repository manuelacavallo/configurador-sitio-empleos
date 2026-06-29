import { useTranslation } from 'react-i18next'
import { useConfigurator } from '../context/ConfiguratorContext'
import Toggle from '../components/ui/Toggle'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import FileUpload from '../components/ui/FileUpload'
import Accordion from '../components/ui/Accordion'
import InfoBox from '../components/ui/InfoBox'
import Button from '../components/ui/Button'
import styles from './StepCommon.module.css'

export default function HomePage({ errors, setFocusArea }) {
  const { t } = useTranslation()
  const { state, dispatch } = useConfigurator()
  const { homePage } = state

  const updateHomePage = (data) => dispatch({ type: 'UPDATE_HOMEPAGE', payload: data })
  const updateHero = (data) => dispatch({ type: 'UPDATE_HERO', payload: data })
  const updateInfo = (data) => dispatch({ type: 'UPDATE_INFO_SECTION', payload: data })
  const updateCard = (id, data) => dispatch({ type: 'UPDATE_CARD', payload: { id, data } })
  const addCard = () => dispatch({ type: 'ADD_CARD' })
  const removeCard = (id) => dispatch({ type: 'REMOVE_CARD', payload: id })

  return (
    <>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>{t('homePage.title')}</h2>
        <p className={styles.stepDesc}>{t('homePage.desc')}</p>
      </div>

      <Toggle
        label={t('homePage.showToggle')}
        checked={homePage.enabled}
        onChange={(v) => updateHomePage({ enabled: v })}
      />

      {homePage.enabled && (
        <>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('homePage.heroSection')}</h3>
            <div className={styles.fields}>
              <Input
                label={t('homePage.heroTitle')}
                required
                value={homePage.hero.title}
                onChange={(v) => updateHero({ title: v })}
                placeholder={t('homePage.heroTitlePlaceholder')}
                error={errors?.['homePage.hero.title']}
                onFocus={() => setFocusArea?.('hero')}
              />
              <div>
                <label className={styles.fieldLabel}>
                  {t('homePage.heroImage')}<span className={styles.required}>*</span>
                </label>
                <FileUpload
                  value={homePage.hero.image}
                  onChange={(v) => updateHero({ image: v })}
                  helper={t('homePage.heroImageHelper')}
                  error={errors?.['homePage.hero.image']}
                />
              </div>
              <InfoBox>{t('homePage.heroButton')}</InfoBox>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.toggleRow}>
              <div className={styles.toggleLabel}>
                <span className={styles.toggleLabelText}>{t('homePage.infoSection')}</span>
                <span className={styles.toggleLabelDesc}>{t('homePage.infoSectionDesc')}</span>
              </div>
              <Toggle
                bare
                checked={homePage.infoSection.enabled}
                onChange={(v) => {
                  updateInfo({ enabled: v })
                  if (v) setFocusArea?.('info')
                }}
              />
            </div>

            {homePage.infoSection.enabled && (
              <div className={styles.fields}>
                <div className={styles.whiteCard}>
                  {(homePage.infoSection.showTitle ?? true) ? (
                    <>
                      <div className={styles.fieldRowHeader}>
                        <span className={styles.fieldRowLabel}>{t('homePage.infoTitle')}</span>
                        <Button variant="danger" onClick={() => updateInfo({ showTitle: false, title: '' })}>{t('homePage.deleteTitle')}</Button>
                      </div>
                      <Input
                        value={homePage.infoSection.title}
                        onChange={(v) => updateInfo({ title: v })}
                        placeholder={t('homePage.infoTitlePlaceholder')}
                        onFocus={() => setFocusArea?.('info')}
                      />
                    </>
                  ) : (
                    <Button variant="secondary" onClick={() => updateInfo({ showTitle: true })}>{t('homePage.addTitle')}</Button>
                  )}

                  {(homePage.infoSection.showDescription ?? true) ? (
                    <>
                      <div className={styles.fieldRowHeader}>
                        <span className={styles.fieldRowLabel}>{t('homePage.infoDesc')}</span>
                        <Button variant="danger" onClick={() => updateInfo({ showDescription: false, description: '' })}>{t('homePage.deleteDesc')}</Button>
                      </div>
                      <Textarea
                        value={homePage.infoSection.description}
                        onChange={(v) => updateInfo({ description: v })}
                        placeholder={t('homePage.infoDescPlaceholder')}
                        maxLength={500}
                        onFocus={() => setFocusArea?.('info')}
                      />
                    </>
                  ) : (
                    <Button variant="secondary" onClick={() => updateInfo({ showDescription: true })}>{t('homePage.addDesc')}</Button>
                  )}
                </div>

                {homePage.infoSection.cards.some(c => (c.image || c.title?.trim() || c.description?.trim()) && !(c.image && c.title?.trim() && c.description?.trim())) && (
                  <InfoBox variant="warning">
                    {t('homePage.cardsWarning')}
                  </InfoBox>
                )}

                {homePage.infoSection.cards.map((card, index) => (
                  <Accordion key={card.id} title={t('homePage.cardTitle', { number: index + 1 })} defaultOpen={index === homePage.infoSection.cards.length - 1}>
                    <div>
                      <label className={styles.fieldLabel}>{t('homePage.cardImage')}</label>
                      <FileUpload
                        value={card.image}
                        onChange={(v) => updateCard(card.id, { image: v })}
                        helper={t('homePage.cardImageHelper')}
                      />
                    </div>
                    <Input
                      label={t('homePage.cardTitleLabel')}
                      value={card.title}
                      onChange={(v) => updateCard(card.id, { title: v })}
                      placeholder={t('homePage.cardTitlePlaceholder')}
                      onFocus={() => setFocusArea?.('info')}
                    />
                    <Textarea
                      label={t('homePage.cardDesc')}
                      value={card.description}
                      onChange={(v) => updateCard(card.id, { description: v })}
                      placeholder={t('homePage.cardDescPlaceholder')}
                      maxLength={500}
                      onFocus={() => setFocusArea?.('info')}
                    />
                    <Button variant="danger" onClick={() => removeCard(card.id)}>
                      {t('homePage.deleteCard')}
                    </Button>
                  </Accordion>
                ))}

                <Button variant="secondary" fullWidth onClick={addCard}>
                  {t('homePage.addCard')}
                </Button>
              </div>
            )}
          </div>

          <InfoBox variant="info">
            <strong>{t('homePage.featuredJobs')}</strong><br />
            {t('homePage.featuredJobsHelper')}
          </InfoBox>
        </>
      )}
    </>
  )
}
