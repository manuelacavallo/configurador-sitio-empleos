import { useRef, useEffect } from 'react'
import styles from './BrowserFrame.module.css'

export default function BrowserFrame({ url, tabTitle, favicon, focusArea, children }) {
  const chromeRef = useRef(null)

  useEffect(() => {
    const el = chromeRef.current
    if (!el) return
    el.setAttribute('data-highlight-zone', 'browser-chrome')
    const isActive = focusArea === 'browser-tab' || focusArea === 'browser-url'
    if (isActive) {
      el.classList.add('preview-highlight-active')
    } else {
      el.classList.remove('preview-highlight-active')
    }
  }, [focusArea])

  return (
    <div className={styles.frame}>
      <div ref={chromeRef} className={styles.browserChrome}>
        {/* Tab Bar */}
        <div className={styles.tabBar}>
          <div className={styles.tabs}>
            <div className={styles.activeTab}>
              <svg className={styles.tabCurveL} width="6" height="8" viewBox="0 0 6 8" fill="none">
                <path d="M6 8H0V7C0 3.13 3.13 0 7 0H6V8Z" fill="white" />
              </svg>
              <div className={styles.tabContent}>
                <div className={styles.favicon}>
                  {favicon ? (
                    <img src={favicon.dataUrl} alt="" width="16" height="16" style={{ borderRadius: '2px', objectFit: 'contain' }} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="8" fill="#496be3" />
                      <text x="8" y="11.5" textAnchor="middle" fill="white" fontSize="9" fontFamily="Roboto" fontWeight="600">hu</text>
                    </svg>
                  )}
                </div>
                <span className={styles.tabTitle}>{tabTitle || 'Nombre del sitio'}</span>
                <svg className={styles.tabCloseIcon} width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M12 6L6 12M6 6l6 6" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <svg className={styles.tabCurveR} width="6" height="8" viewBox="0 0 6 8" fill="none">
                <path d="M0 8H6V7C6 3.13 2.87 0 -1 0H0V8Z" fill="white" />
              </svg>
            </div>
            <svg className={styles.tabPlusIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 5v10M5 10h10" stroke="#5f6368" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={styles.windowControls}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clipRemove)">
                <path d="M15.8346 10.8327H4.16797V9.16602H15.8346V10.8327Z" fill="#B2B4B8" />
              </g>
              <defs><clipPath id="clipRemove"><rect width="20" height="20" fill="white" /></clipPath></defs>
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="4.6" y="7.00039" width="8.4" height="8.4" stroke="#B2B4B8" strokeWidth="1.2" />
              <path d="M15.3984 4.59961V12.4004H12.998V7H6.99805V4.59961H15.3984Z" stroke="#B2B4B8" strokeWidth="1.2" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clipPath="url(#clipClose)">
                <path d="M15.8346 5.34102L14.6596 4.16602L10.0013 8.82435L5.34297 4.16602L4.16797 5.34102L8.8263 9.99935L4.16797 14.6577L5.34297 15.8327L10.0013 11.1743L14.6596 15.8327L15.8346 14.6577L11.1763 9.99935L15.8346 5.34102Z" fill="#B2B4B8" />
              </g>
              <defs><clipPath id="clipClose"><rect width="20" height="20" fill="white" /></clipPath></defs>
            </svg>
          </div>
        </div>

        {/* Address Bar */}
        <div className={styles.addressBar}>
          <div className={styles.navIcons}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.2299 7.07685H4.62795L8.38601 3.31879C8.68635 3.01845 8.68635 2.52559 8.38601 2.22525C8.08567 1.92492 7.60051 1.92492 7.30018 2.22525L2.22525 7.30018C1.92492 7.60051 1.92492 8.08567 2.22525 8.38601L7.30018 13.4609C7.60051 13.7613 8.08567 13.7613 8.38601 13.4609C8.68635 13.1606 8.68635 12.6754 8.38601 12.3751L4.62795 8.61704H13.2299C13.6535 8.61704 14 8.2705 14 7.84694C14 7.42339 13.6535 7.07685 13.2299 7.07685Z" fill="#5F6368" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.77009 8.61704H11.3721L7.61399 12.3751C7.31365 12.6754 7.31365 13.1683 7.61399 13.4686C7.91433 13.769 8.39949 13.769 8.69982 13.4686L13.7747 8.39371C14.0751 8.09337 14.0751 7.60821 13.7747 7.30788L8.70752 2.22525C8.40719 1.92492 7.92203 1.92492 7.62169 2.22525C7.32135 2.52559 7.32135 3.01075 7.62169 3.31109L11.3721 7.07685H2.77009C2.34654 7.07685 2 7.42339 2 7.84694C2 8.2705 2.34654 8.61704 2.77009 8.61704Z" fill="#BABCBE" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.9979 6.33122V2.80455C13.9979 2.50455 13.6379 2.35788 13.4312 2.57122L12.2446 3.75788C11.0379 2.55122 9.31789 1.85788 7.43789 2.02455C4.64456 2.27788 2.34456 4.52455 2.03789 7.31788C1.63789 10.9312 4.45789 13.9979 7.99789 13.9979C11.0579 13.9979 13.5846 11.7046 13.9512 8.74455C13.9979 8.34455 13.6846 7.99788 13.2846 7.99788C12.9512 7.99788 12.6712 8.24455 12.6312 8.57122C12.3446 10.8979 10.3379 12.6979 7.93122 12.6645C5.45789 12.6312 3.37122 10.5445 3.33122 8.06455C3.29122 5.46455 5.40456 3.33122 7.99789 3.33122C9.28456 3.33122 10.4512 3.85788 11.2979 4.69788L9.90456 6.09122C9.69122 6.30455 9.83789 6.66455 10.1379 6.66455H13.6646C13.8512 6.66455 13.9979 6.51788 13.9979 6.33122Z" fill="#5F6368" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8.0011 2.01027C8.18388 1.98491 8.37597 2.03489 8.52357 2.16847L13.7902 6.93507C14.0538 7.17367 14.0752 7.58036 13.838 7.84523C13.599 8.112 13.1885 8.13341 12.923 7.89308L12.4972 7.50734V13.0005C12.4968 13.5522 12.049 14.0002 11.4972 14.0005H4.47571C3.92369 14.0005 3.47613 13.5524 3.47571 13.0005V7.5337L3.07923 7.89308C2.81369 8.13329 2.40412 8.11191 2.16517 7.84523C1.92796 7.58043 1.94858 7.17371 2.21204 6.93507L7.47962 2.16847C7.62701 2.03513 7.81858 1.98516 8.0011 2.01027ZM4.76478 6.36769V12.7046H11.2081V6.34034L8.0011 3.438L4.76478 6.36769Z" fill="#5F6368" />
            </svg>
          </div>
          <div className={styles.urlPill}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M9 4H8.5V3C8.5 1.62 7.38 0.5 6 0.5C4.62 0.5 3.5 1.62 3.5 3V4H3C2.45 4 2 4.45 2 5V10C2 10.55 2.45 11 3 11H9C9.55 11 10 10.55 10 10V5C10 4.45 9.55 4 9 4ZM4.5 4V3C4.5 2.17 5.17 1.5 6 1.5C6.83 1.5 7.5 2.17 7.5 3V4H4.5Z" fill="#5F6368" />
            </svg>
            <span className={styles.urlText}>{url || 'https://jobs.humand.co/tu-empresa'}</span>
            <svg className={styles.starIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3621 5.84008L9.96896 5.54563L8.64395 2.4259C8.40559 1.85803 7.59236 1.85803 7.35399 2.4259L6.02898 5.55264L2.64285 5.84008C2.02591 5.88915 1.77353 6.66032 2.24324 7.06694L4.81614 9.29632L4.04497 12.6053C3.90476 13.2083 4.55675 13.685 5.08956 13.3625L7.99897 11.6098L10.9084 13.3695C11.4412 13.692 12.0932 13.2153 11.953 12.6124L11.1818 9.29632L13.7547 7.06694C14.2244 6.66032 13.979 5.88915 13.3621 5.84008ZM7.99897 10.2988L5.36297 11.8903L6.06404 8.8897L3.73651 6.87064L6.80716 6.60424L7.99897 3.77895L9.19779 6.61125L12.2685 6.87765L9.94092 8.89672L10.642 11.8973L7.99897 10.2988Z" fill="#5F6368" />
            </svg>
          </div>
          <svg className={styles.moreIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.16797 5C8.99297 5 9.66797 4.325 9.66797 3.5C9.66797 2.675 8.99297 2 8.16797 2C7.34297 2 6.66797 2.675 6.66797 3.5C6.66797 4.325 7.34297 5 8.16797 5ZM8.16797 6.5C7.34297 6.5 6.66797 7.175 6.66797 8C6.66797 8.825 7.34297 9.5 8.16797 9.5C8.99297 9.5 9.66797 8.825 9.66797 8C9.66797 7.175 8.99297 6.5 8.16797 6.5ZM8.16797 11C7.34297 11 6.66797 11.675 6.66797 12.5C6.66797 13.325 7.34297 14 8.16797 14C8.99297 14 9.66797 13.325 9.66797 12.5C9.66797 11.675 8.99297 11 8.16797 11Z" fill="#5F6368" />
          </svg>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
