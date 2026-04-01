import { useConfigurator } from '../context/ConfiguratorContext'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import FileUpload from '../components/ui/FileUpload'
import InfoBox from '../components/ui/InfoBox'
import styles from './StepCommon.module.css'

export default function JobList({ errors, setFocusArea }) {
  const { state, dispatch } = useConfigurator()
  const { jobList } = state

  const update = (data) => dispatch({ type: 'UPDATE_JOBLIST', payload: data })

  return (
    <>
      <div className={styles.stepHeader}>
        <h2 className={styles.stepTitle}>Lista de empleos</h2>
        <p className={styles.stepDesc}>
          Es la página principal donde los candidatos buscan y exploran los empleos disponibles.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Encabezado</h3>
        <div className={styles.fields}>
          <Input
            label="Título"
            required
            value={jobList.title}
            onChange={(v) => update({ title: v })}
            placeholder="Título"
            clearable
            error={errors?.['jobList.title']}
            onFocus={() => setFocusArea?.('hero')}
          />
          <Textarea
            label="Descripción (opcional)"
            value={jobList.description}
            onChange={(v) => update({ description: v })}
            placeholder="Descripción"
            maxLength={250}
            onFocus={() => setFocusArea?.('hero')}
          />
          <div>
            <label className={styles.fieldLabel}>Imagen (opcional)</label>
            <FileUpload
              value={jobList.image}
              onChange={(v) => update({ image: v })}
            />
            <div style={{ marginTop: 16 }}>
              <InfoBox>
                Esta imagen se usa también como fondo en el detalle del empleo y en el formulario de aplicación. Si no se sube, se muestra un fondo gris oscuro.
              </InfoBox>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
