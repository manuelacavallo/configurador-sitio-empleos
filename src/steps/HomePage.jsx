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
                  helper="Aspect ratio recomendado: 2:1 (ej: 1440x720px)"
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
                  {(homePage.infoSection.showTitle ?? true) ? (
                    <>
                      <div className={styles.fieldRowHeader}>
                        <span className={styles.fieldRowLabel}>Título</span>
                        <Button variant="danger" onClick={() => updateInfo({ showTitle: false, title: '' })}>Eliminar título</Button>
                      </div>
                      <Input
                        value={homePage.infoSection.title}
                        onChange={(v) => updateInfo({ title: v })}
                        placeholder="Título de la sección"
                        onFocus={() => setFocusArea?.('info')}
                      />
                    </>
                  ) : (
                    <Button variant="secondary" onClick={() => updateInfo({ showTitle: true })}>+ Añadir título</Button>
                  )}

                  {(homePage.infoSection.showDescription ?? true) ? (
                    <>
                      <div className={styles.fieldRowHeader}>
                        <span className={styles.fieldRowLabel}>Descripción</span>
                        <Button variant="danger" onClick={() => updateInfo({ showDescription: false, description: '' })}>Eliminar descripción</Button>
                      </div>
                      <Textarea
                        value={homePage.infoSection.description}
                        onChange={(v) => updateInfo({ description: v })}
                        placeholder="Descripción de la sección"
                        maxLength={500}
                        onFocus={() => setFocusArea?.('info')}
                      />
                    </>
                  ) : (
                    <Button variant="secondary" onClick={() => updateInfo({ showDescription: true })}>+ Añadir descripción</Button>
                  )}
                </div>

                {homePage.infoSection.cards.some(c => (c.image || c.title?.trim() || c.description?.trim()) && !(c.image && c.title?.trim() && c.description?.trim())) && (
                  <InfoBox variant="warning">
                    Algunas cards están incompletas. Completa imagen, título y descripción en cada una, o elimínalas para continuar.
                  </InfoBox>
                )}

                {homePage.infoSection.cards.map((card, index) => (
                  <Accordion key={card.id} title={`Card ${index + 1}`} defaultOpen={index === homePage.infoSection.cards.length - 1}>
                    <div>
                      <label className={styles.fieldLabel}>Imagen</label>
                      <FileUpload
                        value={card.image}
                        onChange={(v) => updateCard(card.id, { image: v })}
                        helper="Aspect ratio recomendado: 3:2 (ej: 900x600px)"
                      />
                    </div>
                    <Input
                      label="Título"
                      value={card.title}
                      onChange={(v) => updateCard(card.id, { title: v })}
                      placeholder="Título"
                      onFocus={() => setFocusArea?.('info')}
                    />
                    <Textarea
                      label="Descripción"
                      value={card.description}
                      onChange={(v) => updateCard(card.id, { description: v })}
                      placeholder="Descripción"
                      maxLength={500}
                      onFocus={() => setFocusArea?.('info')}
                    />
                    <Button variant="danger" onClick={() => removeCard(card.id)}>
                      Eliminar card
                    </Button>
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
