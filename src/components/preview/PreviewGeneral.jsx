import { useConfigurator } from '../../context/ConfiguratorContext'
import { useHighlight } from '../../hooks/useHighlight'
import PreviewFooter from './PreviewFooter'
import styles from './PreviewGeneral.module.css'

export default function PreviewGeneral({ focusArea }) {
  const { state } = useConfigurator()
  const { general } = state

  const headerRef = useHighlight(focusArea, 'header')
  const bodyRef = useHighlight(focusArea, 'body')

  return (
    <div className={styles.wrapper}>
      <div ref={headerRef} className={styles.header}>
        {general.logo ? (
          <img src={general.logo.dataUrl} alt="Logo" className={styles.logo} />
        ) : (
          <div className={styles.logoPlaceholder}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M6 4C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V13.5858L7.29289 10.2929L7.30661 10.2794C7.92076 9.68845 8.67726 9.33025 9.5 9.33025C10.3227 9.33025 11.0792 9.68845 11.6934 10.2794L11.7071 10.2929L14 12.5858L14.2929 12.2929L14.3066 12.2794C14.9208 11.6884 15.6773 11.3302 16.5 11.3302C17.3227 11.3302 18.0792 11.6884 18.6934 12.2794L18.7071 12.2929L20 13.5858V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6ZM22 15.999V6C22 4.93913 21.5786 3.92172 20.8284 3.17157C20.0783 2.42143 19.0609 2 18 2H6C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6V15.9998V18C2 19.0609 2.42143 20.0783 3.17157 20.8284C3.92172 21.5786 4.93913 22 6 22H18C19.0609 22 20.0783 21.5786 20.8284 20.8284C21.5786 20.0783 22 19.0609 22 18V16.001C22 16.0003 22 15.9997 22 15.999ZM20 16.4142L17.3003 13.7146C16.989 13.4174 16.7118 13.3302 16.5 13.3302C16.2882 13.3302 16.011 13.4174 15.6997 13.7146L15.4142 14L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L10.3003 11.7146C9.98904 11.4174 9.71184 11.3302 9.5 11.3302C9.28816 11.3302 9.01096 11.4174 8.69965 11.7146L4 16.4142V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16.4142ZM14 8C14 7.44772 14.4477 7 15 7H15.01C15.5623 7 16.01 7.44772 16.01 8C16.01 8.55228 15.5623 9 15.01 9H15C14.4477 9 14 8.55228 14 8Z" fill="white" />
            </svg>
          </div>
        )}
      </div>

      <div className={styles.heroArea}>
        <div className={styles.skeletonTitle}>
          <div className={styles.skeletonBlock} style={{ width: 190, height: 32 }} />
          <div className={styles.skeletonBlock} style={{ width: 243, height: 32 }} />
        </div>
      </div>

      <div ref={bodyRef} className={styles.body}>
        <div className={styles.skeletonSection}>
          <div className={styles.skeletonBlock} style={{ width: 190, height: 32 }} />
          <div className={styles.skeletonBlock} style={{ width: '100%', height: 59 }} />
          <div className={styles.skeletonBlock} style={{ width: '100%', height: 59 }} />
          <div className={styles.skeletonBlock} style={{ width: '100%', height: 59 }} />
          <div className={styles.skeletonBlock} style={{ width: 243, height: 32 }} />
        </div>
      </div>

      <PreviewFooter
        siteName={general.siteName}
        companyUrl={general.companyUrl}
        focusArea={focusArea}
      />
    </div>
  )
}
