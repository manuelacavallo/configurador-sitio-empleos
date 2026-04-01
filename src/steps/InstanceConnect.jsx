import { useConfigurator } from '../context/ConfiguratorContext'
import SearchSelect from '../components/ui/SearchSelect'
import Button from '../components/ui/Button'
import styles from './InstanceConnect.module.css'

const MOCK_INSTANCES = [
  { id: 12, name: 'Opción 1' },
  { id: 13, name: 'Squid Squad' },
  { id: 14, name: 'Opción 3' },
  { id: 15, name: 'Opción 4' },
]

export default function InstanceConnect({ onConnect }) {
  const { state, dispatch } = useConfigurator()

  const handleSelect = (option) => {
    if (option) {
      dispatch({ type: 'SET_INSTANCE', payload: { id: option.id, name: option.name } })
    } else {
      dispatch({ type: 'SET_INSTANCE', payload: { id: null, name: null } })
    }
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.shell}>
        <div className={styles.shellHeader}>
          <h1 className={styles.shellTitle}>Configuración Sitio de Empleos</h1>
          <button className={styles.closeBtn} aria-label="Cerrar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M7 1C7.55228 1 8 1.44772 8 2V4C8 4.55228 7.55228 5 7 5C6.44772 5 6 4.55228 6 4V2C6 1.44772 6.44772 1 7 1ZM12.1946 6.14687L11.7568 6.65369C11.3957 7.07164 10.7643 7.11778 10.3463 6.75676C9.92836 6.39573 9.88222 5.76425 10.2432 5.34631L10.7062 4.81031C10.7222 4.79189 10.7387 4.77405 10.7559 4.75684C11.8813 3.63165 13.4075 2.99958 14.9989 2.99969C16.5903 2.99981 18.1165 3.63209 19.2417 4.75744C20.3669 5.8828 20.9989 7.40905 20.9988 9.00043C20.9987 10.5918 20.3664 12.118 19.2411 13.2432C19.2246 13.2596 19.2075 13.2756 19.1899 13.2909L18.6559 13.7549C18.239 14.1171 17.6074 14.0728 17.2452 13.6559C16.8829 13.239 16.9272 12.6074 17.3441 12.2452L17.8502 11.8054C18.5859 11.0576 18.9987 10.0502 18.9988 9.00028C18.9989 7.93934 18.5775 6.92181 17.8273 6.17156C17.0772 5.4213 16.0597 4.99977 14.9988 4.99969C13.9493 4.99962 12.9424 5.41192 12.1946 6.14687ZM1 7C1 6.44772 1.44772 6 2 6H4C4.55228 6 5 6.44772 5 7C5 7.55228 4.55228 8 4 8H2C1.44772 8 1 7.55228 1 7ZM15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289ZM6.7494 10.3379C7.11509 10.7517 7.07603 11.3837 6.66216 11.7494L6.16037 12.1928C5.7956 12.5583 5.50555 12.9915 5.30653 13.4681C5.10411 13.953 4.99988 14.4731 4.99988 14.9985C4.99988 15.5239 5.10411 16.044 5.30653 16.5289C5.50895 17.0137 5.80554 17.4535 6.17913 17.8229L6.17916 17.8229C6.9407 18.576 7.96851 18.9984 9.03952 18.9984C10.0866 18.9984 11.0923 18.5947 11.8483 17.873L12.1975 17.4034C12.527 16.9602 13.1534 16.868 13.5966 17.1975C14.0399 17.527 14.132 18.1534 13.8025 18.5966L13.4055 19.1306C13.3754 19.1712 13.3421 19.2095 13.3062 19.2451C12.1702 20.3684 10.6371 20.9984 9.03952 20.9984C7.44197 20.9984 5.90886 20.3684 4.77291 19.2451C4.21121 18.6897 3.76528 18.0284 3.46093 17.2994C3.15659 16.5705 2.99988 15.7884 2.99988 14.9985C2.99988 14.2086 3.15659 13.4265 3.46093 12.6976C3.76528 11.9686 4.21121 11.3073 4.77291 10.7519C4.78621 10.7388 4.79987 10.726 4.81388 10.7136L5.33788 10.2506C5.75175 9.88493 6.38371 9.92399 6.7494 10.3379ZM19 17C19 16.4477 19.4477 16 20 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H20C19.4477 18 19 17.5523 19 17ZM17 19C17.5523 19 18 19.4477 18 20V22C18 22.5523 17.5523 23 17 23C16.4477 23 16 22.5523 16 22V20C16 19.4477 16.4477 19 17 19Z" fill="#29317F" />
              </svg>
            </div>

            <div className={styles.titleGroup}>
              <h2 className={styles.title}>Conecta tu comunidad de Humand</h2>
              <p className={styles.description}>
                Ingresa el Instance ID o el nombre de tu comunidad para vincular el configurador del sitio de empleos.
              </p>
            </div>

            <div className={styles.selectWrapper}>
              <SearchSelect
                label="Instance ID o nombre de comunidad"
                value={state.instanceId}
                onChange={handleSelect}
                options={MOCK_INSTANCES}
                placeholder="Selecciona"
                helper="Si no lo tienes, consulta con..."
              />
            </div>

            {state.instanceId && (
              <div className={styles.connected}>
                <div className={styles.connectedCard}>
                  <svg className={styles.connectedIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10.5L7.5 15L17 5" stroke="#1f622c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <strong>{state.instanceName}</strong>
                    <span>Comunidad conectada</span>
                  </div>
                </div>
                <Button variant="primary" fullWidth onClick={onConnect}>
                  Comenzar configuración
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
