import { useConfigurator } from '../context/ConfiguratorContext'
import Toggle from '../components/ui/Toggle'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import FileUpload from '../components/ui/FileUpload'
import Checkbox from '../components/ui/Checkbox'
import Accordion from '../components/ui/Accordion'
import InfoBox from '../components/ui/InfoBox'
import Button from '../components/ui/Button'
import styles from './StepCommon.module.css'

export default function HomePage({ errors, setFocusArea }) {
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
        <h2 className={styles.stepTitle}>Página de inicio</h2>
        <p className={styles.stepDesc}>
          Es la página de bienvenida de tu sitio de empleos. Puedes configurar el encabezado principal, una sección informativa opcional, y ver cómo se muestran los empleos destacados.
        </p>
      </div>

      <Toggle
        label="Mostrar página de inicio"
        checked={homePage.enabled}
        onChange={(v) => updateHomePage({ enabled: v })}
      />

      {homePage.enabled && (
        <>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Sección principal</h3>
            <div className={styles.fields}>
              <Input
                label="Título"
                required
                value={homePage.hero.title}
                onChange={(v) => updateHero({ title: v })}
                placeholder="Título principal"
                error={errors?.['homePage.hero.title']}
                onFocus={() => setFocusArea?.('hero')}
              />
              <div>
                <label className={styles.fieldLabel}>
                  Imagen<span className={styles.required}>*</span>
                </label>
                <FileUpload
                  value={homePage.hero.image}
                  onChange={(v) => updateHero({ image: v })}
                  helper="Resolución recomendada: 1440x600px"
                  error={errors?.['homePage.hero.image']}
                />
              </div>
              <InfoBox>El botón "Explorar empleos" es fijo y no configurable.</InfoBox>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.toggleRow}>
              <div className={styles.toggleLabel}>
                <span className={styles.toggleLabelText}>Sección informativa</span>
                <span className={styles.toggleLabelDesc}>Imágenes, títulos y descripciones sobre tu empresa, cultura o beneficios.</span>
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
                  <Checkbox
                    label="Añadir título y descripción a la sección"
                    checked={homePage.infoSection.showTitleDescription}
                    onChange={(v) => updateInfo({ showTitleDescription: v })}
                  />
                  {homePage.infoSection.showTitleDescription && (
                    <>
                      <Input
                        label="Título"
                        value={homePage.infoSection.title}
                        onChange={(v) => updateInfo({ title: v })}
                        placeholder="Título"
                        onFocus={() => setFocusArea?.('info')}
                      />
                      <Textarea
                        label="Descripción"
                        value={homePage.infoSection.description}
                        onChange={(v) => updateInfo({ description: v })}
                        placeholder="Descripción"
                        maxLength={250}
                        onFocus={() => setFocusArea?.('info')}
                      />
                    </>
                  )}
                </div>

                {homePage.infoSection.cards.map((card, index) => (
                  <Accordion key={card.id} title={`Card ${index + 1}`} defaultOpen={index === homePage.infoSection.cards.length - 1}>
                    <div>
                      <label className={styles.fieldLabel}>
                        Imagen<span className={styles.required}>*</span>
                      </label>
                      <FileUpload
                        value={card.image}
                        onChange={(v) => updateCard(card.id, { image: v })}
                        helper="Resolución recomendada"
                        error={errors?.[`homePage.infoSection.cards.${index}.image`]}
                      />
                    </div>
                    <Input
                      label="Título"
                      required
                      value={card.title}
                      onChange={(v) => updateCard(card.id, { title: v })}
                      placeholder="Título"
                      error={errors?.[`homePage.infoSection.cards.${index}.title`]}
                      onFocus={() => setFocusArea?.('info')}
                    />
                    <Textarea
                      label="Descripción"
                      required
                      value={card.description}
                      onChange={(v) => updateCard(card.id, { description: v })}
                      placeholder="Descripción"
                      maxLength={250}
                      error={errors?.[`homePage.infoSection.cards.${index}.description`]}
                      onFocus={() => setFocusArea?.('info')}
                    />
                    {homePage.infoSection.cards.length > 1 && (
                      <Button variant="danger" onClick={() => removeCard(card.id)}>
                        Eliminar
                      </Button>
                    )}
                  </Accordion>
                ))}

                <Button variant="secondary" fullWidth onClick={addCard}>
                  + Añadir card
                </Button>
              </div>
            )}
          </div>

          <InfoBox variant="info">
            <strong>Empleos destacados</strong><br />
            Se muestran automáticamente cuando hay 3 o más empleos publicados. Si hay menos, esta sección no aparece en el sitio.
          </InfoBox>
        </>
      )}
    </>
  )
}
