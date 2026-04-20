import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function getFileExtension(fileObj) {
  if (!fileObj) return ''
  const name = fileObj.name || ''
  const ext = name.split('.').pop()
  return ext ? `.${ext}` : '.png'
}

async function addFileToZip(zip, fileObj, filename) {
  if (!fileObj) return null
  if (fileObj.file) {
    zip.file(filename, fileObj.file)
  } else if (fileObj.dataUrl) {
    const response = await fetch(fileObj.dataUrl)
    const blob = await response.blob()
    zip.file(filename, blob)
  }
  return filename
}

export async function exportConfiguration(state) {
  const zip = new JSZip()
  const slug = state.general.urlSlug || 'config'

  const faviconFilename = state.general.favicon
    ? `favicon${getFileExtension(state.general.favicon)}`
    : null
  if (faviconFilename) await addFileToZip(zip, state.general.favicon, faviconFilename)

  const logoFilename = state.general.logo
    ? `logo${getFileExtension(state.general.logo)}`
    : null
  if (logoFilename) await addFileToZip(zip, state.general.logo, logoFilename)

  let heroFilename = null
  if (state.homePage.enabled && state.homePage.hero.image) {
    heroFilename = `hero${getFileExtension(state.homePage.hero.image)}`
    await addFileToZip(zip, state.homePage.hero.image, heroFilename)
  }

  const cardFilenames = []
  if (state.homePage.enabled && state.homePage.infoSection.enabled) {
    for (let i = 0; i < state.homePage.infoSection.cards.length; i++) {
      const card = state.homePage.infoSection.cards[i]
      if (card.image) {
        const filename = `card-${i + 1}${getFileExtension(card.image)}`
        await addFileToZip(zip, card.image, filename)
        cardFilenames.push(filename)
      } else {
        cardFilenames.push(null)
      }
    }
  }

  let joblistImageFilename = null
  if (state.jobList.image) {
    joblistImageFilename = `joblist-header${getFileExtension(state.jobList.image)}`
    await addFileToZip(zip, state.jobList.image, joblistImageFilename)
  }

  const homeCards = (state.homePage.enabled && state.homePage.infoSection.enabled)
    ? state.homePage.infoSection.cards.map((card, i) => ({
        image: cardFilenames[i] || null,
        title: card.title,
        description: card.description,
        sortOrder: i,
      }))
    : []

  const config = {
    name: state.general.siteName,
    active: true,
    siteSlug: state.general.urlSlug,
    logo: logoFilename,
    favicon: faviconFilename,
    websiteUrl: state.general.companyUrl || null,
    privacyPolicyUrl: state.general.privacyUrl || null,
    homeHeroTitle: state.homePage.enabled ? (state.homePage.hero.title || null) : null,
    homeHeroImage: state.homePage.enabled ? heroFilename : null,
    homeMainTitle: (state.homePage.enabled && state.homePage.infoSection.enabled && state.homePage.infoSection.showTitleDescription)
      ? (state.homePage.infoSection.title || null)
      : null,
    homeMainDescription: (state.homePage.enabled && state.homePage.infoSection.enabled && state.homePage.infoSection.showTitleDescription)
      ? (state.homePage.infoSection.description || null)
      : null,
    jobListHeroImage: joblistImageFilename,
    jobListHeroTitle: state.jobList.title || null,
    jobListHeroDescription: state.jobList.description || null,
    homeCards,
  }

  const cleanConfig = Object.fromEntries(
    Object.entries(config).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
  )

  const configJson = JSON.stringify(cleanConfig, null, 2)
  const configBlob = new Blob([configJson], { type: 'application/json' })
  saveAs(configBlob, `${slug}-config.json`)

  const hasImages = faviconFilename || logoFilename || heroFilename || joblistImageFilename || cardFilenames.some(Boolean)
  if (hasImages) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, `${slug}-assets.zip`)
    return { configName: `${slug}-config.json`, zipName: `${slug}-assets.zip` }
  }

  return { configName: `${slug}-config.json`, zipName: null }
}
