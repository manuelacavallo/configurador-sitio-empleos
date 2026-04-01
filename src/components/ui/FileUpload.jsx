import { useRef } from 'react'
import styles from './FileUpload.module.css'

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getExtension(name) {
  return name.split('.').pop().toUpperCase()
}

export default function FileUpload({ value, onChange, error, helper }) {
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      onChange({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleRemove = () => {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDownload = () => {
    if (!value) return
    const a = document.createElement('a')
    a.href = value.dataUrl
    a.download = value.name
    a.click()
  }

  if (value) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.fileDisplay}>
          <div className={styles.fileAvatar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M6 4C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V13.5858L7.29289 10.2929L7.30661 10.2794C7.92076 9.68845 8.67726 9.33025 9.5 9.33025C10.3227 9.33025 11.0792 9.68845 11.6934 10.2794L11.7071 10.2929L14 12.5858L14.2929 12.2929L14.3066 12.2794C14.9208 11.6884 15.6773 11.3302 16.5 11.3302C17.3227 11.3302 18.0792 11.6884 18.6934 12.2794L18.7071 12.2929L20 13.5858V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6ZM22 15.999V6C22 4.93913 21.5786 3.92172 20.8284 3.17157C20.0783 2.42143 19.0609 2 18 2H6C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6V15.9998V18C2 19.0609 2.42143 20.0783 3.17157 20.8284C3.92172 21.5786 4.93913 22 6 22H18C19.0609 22 20.0783 21.5786 20.8284 20.8284C21.5786 20.0783 22 19.0609 22 18V16.001C22 16.0003 22 15.9997 22 15.999ZM20 16.4142L17.3003 13.7146C16.989 13.4174 16.7118 13.3302 16.5 13.3302C16.2882 13.3302 16.011 13.4174 15.6997 13.7146L15.4142 14L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L10.3003 11.7146C9.98904 11.4174 9.71184 11.3302 9.5 11.3302C9.28816 11.3302 9.01096 11.4174 8.69965 11.7146L4 16.4142V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16.4142ZM14 8C14 7.44772 14.4477 7 15 7H15.01C15.5623 7 16.01 7.44772 16.01 8C16.01 8.55228 15.5623 9 15.01 9H15C14.4477 9 14 8.55228 14 8Z" fill="#8B5CF6" />
            </svg>
          </div>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{value.name}</span>
            <span className={styles.fileMeta}>
              {formatSize(value.size)} <span>•</span> {getExtension(value.name)}
            </span>
          </div>
          <div className={styles.fileActions}>
            <button type="button" className={styles.actionBtn} onClick={handleDownload} title="Descargar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V14.5858L16.2929 11.2929C16.6834 10.9024 17.3166 10.9024 17.7071 11.2929C18.0976 11.6834 18.0976 12.3166 17.7071 12.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L6.29289 12.7071C5.90237 12.3166 5.90237 11.6834 6.29289 11.2929C6.68342 10.9024 7.31658 10.9024 7.70711 11.2929L11 14.5858V4C11 3.44772 11.4477 3 12 3ZM4 19C4 18.4477 4.44772 18 5 18H19C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19Z" fill="#303036" />
              </svg>
            </button>
            <button type="button" className={styles.actionBtn} onClick={handleRemove} title="Eliminar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 2C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H16V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10ZM14 5V4H10V5H14ZM7 7V20H17V7H7ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z" fill="#303036" />
              </svg>
            </button>
          </div>
        </div>
        {helper && <span className={styles.helper}>{helper}</span>}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.dropzone} ${error ? styles.hasError : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className={styles.hiddenInput}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <span className={styles.dropText}>Elija un archivo o arrástrelo aquí</span>
        <span className={styles.dropSubtext}>Formatos permitidos: JPG o PNG hasta 50mb</span>
        <span className={styles.uploadLink}>
          Subir archivo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 10V3m0 0L4.5 5.5M7 3l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {helper && <span className={styles.helper}>{helper}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
