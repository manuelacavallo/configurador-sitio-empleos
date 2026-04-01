import { useState } from 'react'
import { useConfigurator } from '../context/ConfiguratorContext'
import { validateAllSteps, isStepFullyComplete, isStepDisabled, isInfoCardComplete } from '../utils/validation'
import InfoBox from '../components/ui/InfoBox'
import Button from '../components/ui/Button'
import styles from './Export.module.css'

function SummarySection({ title, status, children, onEdit }) {
  const [open, setOpen] = useState(true)

  return (
    <div className={styles.summarySection}>
      <div className={styles.summaryHeader} onClick={() => setOpen(!open)}>
        <div className={styles.summaryHeaderLeft}>
          {status === 'complete' ? (
            <div className={styles.successAvatar}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.7071 6.29289C21.0976 6.68342 21.0976 7.31658 20.7071 7.70711L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929C4.68342 10.9024 5.31658 10.9024 5.70711 11.2929L10 15.5858L19.2929 6.29289C19.6834 5.90237 20.3166 5.90237 20.7071 6.29289Z" fill="#1F622C" />
              </svg>
            </div>
          ) : status === 'partial' ? (
            <div className={styles.infoAvatar}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M11 2.99822C11.001 2.44594 11.4495 1.99902 12.0018 2C13.3138 2.00234 14.6126 2.26284 15.824 2.76667C16.3339 2.97875 16.5754 3.56406 16.3633 4.074C16.1513 4.58395 15.5659 4.82541 15.056 4.61333C14.0868 4.21027 13.0478 4.00187 11.9982 4C11.4459 3.99901 10.999 3.5505 11 2.99822ZM9.48397 3.30753C9.6952 3.81783 9.45276 4.40274 8.94247 4.61397C7.97187 5.01574 7.0899 5.60472 6.34691 6.3473C5.95628 6.73772 5.32311 6.73754 4.9327 6.34691C4.54228 5.95628 4.54246 5.32311 4.93309 4.9327C5.86183 4.00447 6.96429 3.26824 8.17753 2.76603C8.68783 2.5548 9.27274 2.79724 9.48397 3.30753ZM17.6531 4.9327C18.0437 4.54228 18.6769 4.54246 19.0673 4.93309C19.9955 5.86183 20.7318 6.96429 21.234 8.17753C21.4452 8.68783 21.2028 9.27274 20.6925 9.48397C20.1822 9.6952 19.5973 9.45276 19.386 8.94247C18.9843 7.97187 18.3953 7.0899 17.6527 6.34691C17.2623 5.95628 17.2625 5.32311 17.6531 4.9327ZM4.074 7.63667C4.58395 7.84875 4.82541 8.43406 4.61333 8.944C4.21027 9.91316 4.00187 10.9522 4 12.0018C3.99901 12.5541 3.5505 13.001 2.99822 13C2.44594 12.999 1.99902 12.5505 2 11.9982C2.00234 10.6862 2.26284 9.38744 2.76667 8.176C2.97875 7.66606 3.56406 7.42459 4.074 7.63667ZM21.0018 11C21.5541 11.001 22.001 11.4495 22 12.0018C21.9977 13.3138 21.7372 14.6126 21.2333 15.824C21.0212 16.3339 20.4359 16.5754 19.926 16.3633C19.4161 16.1513 19.1746 15.5659 19.3867 15.056C19.7897 14.0868 19.9981 13.0478 20 11.9982C20.001 11.4459 20.4495 10.999 21.0018 11ZM3.30754 14.516C3.81783 14.3048 4.40274 14.5472 4.61397 15.0575C5.01574 16.0281 5.60472 16.9101 6.34731 17.6531C6.73772 18.0437 6.73755 18.6769 6.34691 19.0673C5.95628 19.4577 5.32312 19.4575 4.9327 19.0669C4.00447 18.1382 3.26824 17.0357 2.76603 15.8225C2.5548 15.3122 2.79724 14.7273 3.30754 14.516ZM19.0673 17.6531C19.4577 18.0437 19.4575 18.6769 19.0669 19.0673C18.1382 19.9955 17.0357 20.7318 15.8225 21.234C15.3122 21.4452 14.7273 21.2028 14.516 20.6925C14.3048 20.1822 14.5472 19.5973 15.0575 19.386C16.0281 18.9843 16.9101 18.3953 17.6531 17.6527C18.0437 17.2623 18.6769 17.2625 19.0673 17.6531ZM7.63667 19.926C7.84874 19.4161 8.43406 19.1746 8.944 19.3867C9.91316 19.7897 10.9522 19.9981 12.0018 20C12.5541 20.001 13.001 20.4495 13 21.0018C12.999 21.5541 12.5505 22.001 11.9982 22C10.6862 21.9977 9.38744 21.7372 8.17599 21.2333C7.66605 21.0213 7.42459 20.4359 7.63667 19.926Z" fill="#326F8B" />
              </svg>
            </div>
          ) : status === 'disabled' ? (
            <div className={styles.warningAvatar}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4734 2.38498C10.9209 2.13323 11.4256 2.00098 11.939 2.00098C12.4525 2.00098 12.9572 2.13323 13.4047 2.38498C13.8521 2.63673 14.2272 2.9995 14.4937 3.43832L14.4969 3.44352L22.9199 17.5035L22.9282 17.5176C23.1889 17.9695 23.3269 18.4818 23.3283 19.0035C23.3297 19.5252 23.1945 20.0382 22.9362 20.4915C22.6779 20.9448 22.3054 21.3226 21.8558 21.5873C21.4062 21.852 20.8952 21.9944 20.3735 22.0004L20.362 22.0005L3.50561 22.0004C2.98392 21.9945 2.47287 21.852 2.02328 21.5873C1.57369 21.3226 1.20122 20.9448 0.94289 20.4915C0.684564 20.0382 0.549385 19.5252 0.550792 19.0035C0.552199 18.4818 0.690144 17.9695 0.95091 17.5176L0.959174 17.5036L9.38433 3.43831C9.65085 2.99949 10.0259 2.63673 10.4734 2.38498ZM11.939 4.00098C11.7692 4.00098 11.6021 4.04474 11.4541 4.12804C11.3068 4.21093 11.1831 4.3302 11.095 4.47445L2.67983 18.5231C2.59571 18.6712 2.55124 18.8385 2.55078 19.0089C2.55032 19.1815 2.59505 19.3513 2.68052 19.5013C2.766 19.6512 2.88924 19.7762 3.038 19.8638C3.18541 19.9506 3.35279 19.9977 3.52378 20.0004H20.3553C20.5263 19.9977 20.6937 19.9506 20.8411 19.8638C20.9898 19.7762 21.1131 19.6512 21.1986 19.5013C21.284 19.3513 21.3288 19.1815 21.3283 19.0089C21.3278 18.8385 21.2834 18.6712 21.1993 18.5231L12.7843 4.47657C12.7839 4.47586 12.7835 4.47516 12.7831 4.47445C12.695 4.33021 12.5713 4.21093 12.424 4.12804C12.2759 4.04474 12.1089 4.00098 11.939 4.00098ZM11.9991 8.00045C12.5513 8.00045 12.9991 8.44816 12.9991 9.00045V13.0004C12.9991 13.5527 12.5513 14.0004 11.9991 14.0004C11.4468 14.0004 10.9991 13.5527 10.9991 13.0004V9.00045C10.9991 8.44816 11.4468 8.00045 11.9991 8.00045ZM10.9991 17.0004C10.9991 16.4482 11.4468 16.0004 11.9991 16.0004H12.0091C12.5613 16.0004 13.0091 16.4482 13.0091 17.0004C13.0091 17.5527 12.5613 18.0004 12.0091 18.0004H11.9991C11.4468 18.0004 10.9991 17.5527 10.9991 17.0004Z" fill="#7E4317" />
              </svg>
            </div>
          ) : (
            <div className={styles.warningAvatar}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4734 2.38498C10.9209 2.13323 11.4256 2.00098 11.939 2.00098C12.4525 2.00098 12.9572 2.13323 13.4047 2.38498C13.8521 2.63673 14.2272 2.9995 14.4937 3.43832L14.4969 3.44352L22.9199 17.5035L22.9282 17.5176C23.1889 17.9695 23.3269 18.4818 23.3283 19.0035C23.3297 19.5252 23.1945 20.0382 22.9362 20.4915C22.6779 20.9448 22.3054 21.3226 21.8558 21.5873C21.4062 21.852 20.8952 21.9944 20.3735 22.0004L20.362 22.0005L3.50561 22.0004C2.98392 21.9945 2.47287 21.852 2.02328 21.5873C1.57369 21.3226 1.20122 20.9448 0.94289 20.4915C0.684564 20.0382 0.549385 19.5252 0.550792 19.0035C0.552199 18.4818 0.690144 17.9695 0.95091 17.5176L0.959174 17.5036L9.38433 3.43831C9.65085 2.99949 10.0259 2.63673 10.4734 2.38498ZM11.939 4.00098C11.7692 4.00098 11.6021 4.04474 11.4541 4.12804C11.3068 4.21093 11.1831 4.3302 11.095 4.47445L2.67983 18.5231C2.59571 18.6712 2.55124 18.8385 2.55078 19.0089C2.55032 19.1815 2.59505 19.3513 2.68052 19.5013C2.766 19.6512 2.88924 19.7762 3.038 19.8638C3.18541 19.9506 3.35279 19.9977 3.52378 20.0004H20.3553C20.5263 19.9977 20.6937 19.9506 20.8411 19.8638C20.9898 19.7762 21.1131 19.6512 21.1986 19.5013C21.284 19.3513 21.3288 19.1815 21.3283 19.0089C21.3278 18.8385 21.2834 18.6712 21.1993 18.5231L12.7843 4.47657C12.7839 4.47586 12.7835 4.47516 12.7831 4.47445C12.695 4.33021 12.5713 4.21093 12.424 4.12804C12.2759 4.04474 12.1089 4.00098 11.939 4.00098ZM11.9991 8.00045C12.5513 8.00045 12.9991 8.44816 12.9991 9.00045V13.0004C12.9991 13.5527 12.5513 14.0004 11.9991 14.0004C11.4468 14.0004 10.9991 13.5527 10.9991 13.0004V9.00045C10.9991 8.44816 11.4468 8.00045 11.9991 8.00045ZM10.9991 17.0004C10.9991 16.4482 11.4468 16.0004 11.9991 16.0004H12.0091C12.5613 16.0004 13.0091 16.4482 13.0091 17.0004C13.0091 17.5527 12.5613 18.0004 12.0091 18.0004H11.9991C11.4468 18.0004 10.9991 17.5527 10.9991 17.0004Z" fill="#7E4317" />
              </svg>
            </div>
          )}
          <span className={styles.summaryTitle}>{title}</span>
        </div>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && (
        <div className={styles.summaryContent}>
          {children}
          <div className={styles.editRow}>
            <Button variant="secondary" onClick={onEdit}>
              Editar {title.toLowerCase()}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryRow({ label, value, pending }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      {pending ? (
        <span className={styles.rowPending}>Pendiente</span>
      ) : (
        <span className={styles.rowValue}>{value}</span>
      )}
    </div>
  )
}

function SubSection({ title, children }) {
  return (
    <div className={styles.subSection}>
      <h4 className={styles.subSectionTitle}>{title}</h4>
      {children}
    </div>
  )
}

export default function Export({ onNavigateToStep, exportResult, exportError }) {
  const { state } = useConfigurator()

  const allErrors = validateAllSteps(state)
  const step0Complete = Object.keys(allErrors.step0).length === 0
  const step1Complete = Object.keys(allErrors.step1).length === 0
  const step2Complete = Object.keys(allErrors.step2).length === 0
  const step0Full = isStepFullyComplete(0, state)
  const step1Full = isStepFullyComplete(1, state)
  const step2Full = isStepFullyComplete(2, state)
  const step1Disabled = isStepDisabled(1, state)

  const hasIncompleteInfoCards = state.homePage.enabled &&
    state.homePage.infoSection.enabled &&
    state.homePage.infoSection.cards.some(c => !isInfoCardComplete(c))

  const getStatus = (complete, full, disabled) => {
    if (disabled) return 'disabled'
    if (full) return 'complete'
    if (complete) return 'partial'
    return 'pending'
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Resumen de configuración</h2>
        <p className={styles.desc}>
          Revisa tu configuración y descarga los archivos para subir a Humand Ops. Al exportar se descargan dos archivos, uno JSON con la configuración completa del sitio y un ZIP con todas las imágenes y logos que se usaron. Todos los campos obligatorios deben estar completos para poder exportar.
        </p>
      </div>

      {exportResult && (
        <InfoBox variant="success">
          <strong>Configuración exportada</strong><br />
          Los archivos se descargaron correctamente: {exportResult.configName} y {exportResult.zipName}
        </InfoBox>
      )}

      {exportError && (
        <InfoBox variant="error">{exportError}</InfoBox>
      )}

      <SummarySection
        title="Configuración general"
        status={getStatus(step0Complete, step0Full)}
        onEdit={() => onNavigateToStep(0)}
      >
        <SubSection title="Información básica">
          <SummaryRow label="Nombre del sitio" value={state.general.siteName} pending={!state.general.siteName} />
          <SummaryRow label="URL de la página" value={`jobs.humand.co/${state.general.urlSlug}`} pending={!state.general.urlSlug} />
          <SummaryRow label="Favicon" value={state.general.favicon ? 'Subido' : '—'} />
        </SubSection>
        <SubSection title="Encabezado">
          <SummaryRow label="Logo" value="Subido" pending={!state.general.logo} />
        </SubSection>
        <SubSection title="Pie de página">
          <SummaryRow label="URL política de privacidad" value={state.general.privacyUrl} pending={!state.general.privacyUrl} />
          <SummaryRow label="URL de la empresa" value={state.general.companyUrl || '—'} />
        </SubSection>
      </SummarySection>

      <SummarySection
        title="Página de inicio"
        status={getStatus(step1Complete, step1Full, step1Disabled)}
        onEdit={() => onNavigateToStep(1)}
      >
        {step1Disabled ? (
          <InfoBox variant="warning" hideIcon>
            <strong>Sección desactivada</strong><br />
            La página de inicio no está habilitada. Para configurarla, activá el toggle desde la sección Página de inicio.
          </InfoBox>
        ) : (
          <>
            <SubSection title="Sección principal">
              <SummaryRow label="Título" value={state.homePage.hero.title} pending={!state.homePage.hero.title} />
              <SummaryRow label="Imagen" value="Subido" pending={!state.homePage.hero.image} />
            </SubSection>
            {state.homePage.infoSection.enabled && (
              <SubSection title="Sección informativa">
                {state.homePage.infoSection.showTitleDescription && (
                  <>
                    <SummaryRow label="Título" value={state.homePage.infoSection.title || '—'} />
                    <SummaryRow label="Descripción" value={state.homePage.infoSection.description || '—'} />
                  </>
                )}
                {state.homePage.infoSection.cards.map((card, i) => (
                  <SummaryRow
                    key={card.id}
                    label={`Card ${i + 1}`}
                    value={card.title || '—'}
                    pending={!isInfoCardComplete(card)}
                  />
                ))}
                {hasIncompleteInfoCards && (
                  <InfoBox variant="warning">
                    Completá al menos una card con imagen, título y descripción para que la sección informativa se muestre en tu sitio.
                  </InfoBox>
                )}
              </SubSection>
            )}
          </>
        )}
      </SummarySection>

      <SummarySection
        title="Lista de empleos"
        status={getStatus(step2Complete, step2Full)}
        onEdit={() => onNavigateToStep(2)}
      >
        <SubSection title="Encabezado">
          <SummaryRow label="Título" value={state.jobList.title} pending={!state.jobList.title} />
          <SummaryRow label="Descripción" value={state.jobList.description || '—'} />
          <SummaryRow label="Imagen" value={state.jobList.image ? 'Subido' : '—'} />
        </SubSection>
      </SummarySection>
    </div>
  )
}
