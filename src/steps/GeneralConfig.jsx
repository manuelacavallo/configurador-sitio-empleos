import { useConfigurator } from '../context/ConfiguratorContext'
import Input from '../components/ui/Input'
import FileUpload from '../components/ui/FileUpload'
import styles from './StepCommon.module.css'

export default function GeneralConfig({ errors, setFocusArea }) {
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
        <h2 className={styles.stepTitle}>Configuración general</h2>
        <p className={styles.stepDesc}>
          Datos básicos del sitio, encabezado y pie de página. Esta configuración aplica a todas las páginas.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Información básica</h3>
        <div className={styles.fields}>
          <Input
            label="Nombre del sitio"
            required
            value={general.siteName}
            onChange={(v) => update({ siteName: v })}
            placeholder="Nombre del sitio"
            helper="Aparece en la pestaña del navegador"
            error={errors?.['general.siteName']}
            onFocus={() => setFocusArea?.('browser-tab')}
            onBlur={() => setFocusArea?.(null)}
          />
          <Input
            label="URL de la página"
            required
            value={general.urlSlug}
            onChange={handleSlugChange}
            placeholder="Tu URL"
            prefix="jobs.humand.co/"
            helper="Se agrega al final de jobs.humand.co/ para formar la dirección de tu sitio."
            maxLength={30}
            clearable
            error={errors?.['general.urlSlug']}
            onFocus={() => setFocusArea?.('browser-url')}
            onBlur={() => setFocusArea?.(null)}
          />
          <div>
            <label className={styles.fieldLabel}>Favicon (opcional)</label>
            <FileUpload
              value={general.favicon}
              onChange={(v) => update({ favicon: v })}
              helper="Resolución recomendada: 64x64px"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Encabezado</h3>
        <p className={styles.sectionDesc}>La barra superior con tu logo que aparece en todas las páginas.</p>
        <div className={styles.fields}>
          <div>
            <label className={styles.fieldLabel}>
              Logo<span className={styles.required}>*</span>
            </label>
            <FileUpload
              value={general.logo}
              onChange={(v) => update({ logo: v })}
              helper="Se recomienda un logo en colores claros para garantizar buena visibilidad en todas las páginas del sitio."
              error={errors?.['general.logo']}
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Pie de página</h3>
        <p className={styles.sectionDesc}>La barra inferior con enlaces legales que aparece en todas las páginas.</p>
        <div className={styles.fields}>
          <Input
            label="URL política de privacidad"
            required
            value={general.privacyUrl}
            onChange={(v) => update({ privacyUrl: v })}
            placeholder="URL"
            error={errors?.['general.privacyUrl']}
            onFocus={() => setFocusArea?.('footer')}
            onBlur={() => setFocusArea?.(null)}
          />
          <Input
            label="URL de la empresa (opcional)"
            value={general.companyUrl}
            onChange={(v) => update({ companyUrl: v })}
            placeholder="URL"
            helper="Si se completa, el nombre del sitio aparece en el pie de página con un enlace a esta dirección."
            clearable
            onFocus={() => setFocusArea?.('footer')}
            onBlur={() => setFocusArea?.(null)}
          />
        </div>
      </div>
    </>
  )
}
