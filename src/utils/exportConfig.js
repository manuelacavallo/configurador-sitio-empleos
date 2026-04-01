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
  return `assets/${filename}`
}

export async function exportConfiguration(state) {
  const zip = new JSZip()
  const assetsFolder = zip.folder('assets')
  const slug = state.general.urlSlug || 'config'

  const faviconPath = state.general.favicon
    ? await addFileToZip(assetsFolder, state.general.favicon, `favicon${getFileExtension(state.general.favicon)}`)
    : null

  const logoPath = state.general.logo
    ? await addFileToZip(assetsFolder, state.general.logo, `logo${getFileExtension(state.general.logo)}`)
    : null

  let heroPath = null
  if (state.homePage.enabled && state.homePage.hero.image) {
    heroPath = await addFileToZip(assetsFolder, state.homePage.hero.image, `hero${getFileExtension(state.homePage.hero.image)}`)
  }

  const cardPaths = []
  if (state.homePage.enabled && state.homePage.infoSection.enabled) {
    for (let i = 0; i < state.homePage.infoSection.cards.length; i++) {
      const card = state.homePage.infoSection.cards[i]
      if (card.image) {
        const path = await addFileToZip(assetsFolder, card.image, `card-${i + 1}${getFileExtension(card.image)}`)
        cardPaths.push(path)
      } else {
        cardPaths.push(null)
      }
    }
  }

  let joblistImagePath = null
  if (state.jobList.image) {
    joblistImagePath = await addFileToZip(assetsFolder, state.jobList.image, `joblist-header${getFileExtension(state.jobList.image)}`)
  }

  const config = {
    instanceId: state.instanceId,
    instanceName: state.instanceName,
    general: {
      siteName: state.general.siteName,
      urlSlug: state.general.urlSlug,
      favicon: faviconPath,
      logo: logoPath,
      privacyUrl: state.general.privacyUrl || null,
      companyUrl: state.general.companyUrl || null,
    },
    homePage: {
      enabled: state.homePage.enabled,
      hero: {
        title: state.homePage.hero.title,
        image: heroPath,
      },
      infoSection: {
        enabled: state.homePage.infoSection.enabled,
        ...(state.homePage.infoSection.showTitleDescription
          ? {
              title: state.homePage.infoSection.title || null,
              description: state.homePage.infoSection.description || null,
            }
          : {}),
        cards: state.homePage.infoSection.cards.map((card, i) => ({
          title: card.title,
          description: card.description,
          image: cardPaths[i] || null,
        })),
      },
    },
    jobList: {
      title: state.jobList.title,
      description: state.jobList.description || null,
      image: joblistImagePath,
    },
  }

  const configJson = JSON.stringify(config, null, 2)
  const configBlob = new Blob([configJson], { type: 'application/json' })
  saveAs(configBlob, `${slug}-config.json`)

  const zipBlob = await zip.generateAsync({ type: 'blob' })
  saveAs(zipBlob, `${slug}-assets.zip`)

  return { configName: `${slug}-config.json`, zipName: `${slug}-assets.zip` }
}
