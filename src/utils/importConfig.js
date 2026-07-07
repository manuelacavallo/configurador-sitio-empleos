import JSZip from 'jszip'

async function blobToFileObj(blob, filename) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () =>
      resolve({
        name: filename,
        size: blob.size,
        type: blob.type || 'image/png',
        dataUrl: reader.result,
        file: null,
      })
    reader.readAsDataURL(blob)
  })
}

export async function importFromFiles({ jsonFile, zipFile }) {
  if (!jsonFile) throw new Error('No encontramos el archivo JSON. Asegúrate de seleccionar el archivo correcto.')

  const text = await jsonFile.text()
  const jsonData = JSON.parse(text)

  let zip = null
  if (zipFile) {
    zip = await JSZip.loadAsync(zipFile)
  }

  const getImage = async (filename) => {
    if (!filename || !zip) return null
    const zipEntry = zip.files[filename]
    if (!zipEntry) return null
    const blob = await zipEntry.async('blob')
    return blobToFileObj(blob, filename)
  }

  const logo = await getImage(jsonData.logo)
  const favicon = await getImage(jsonData.favicon)
  const heroImage = await getImage(jsonData.homeHeroImage)
  const joblistImage = await getImage(jsonData.jobListHeroImage)

  const cards = jsonData.homeCards || []
  const cardImages = await Promise.all(cards.map((card) => getImage(card.image)))

  const hasInfoSection = !!(jsonData.homeMainTitle || jsonData.homeMainDescription || cards.length > 0)
  const hasHomePage = !!(jsonData.homeHeroTitle || jsonData.homeHeroImage || hasInfoSection)

  return {
    general: {
      siteName: jsonData.name || '',
      urlSlug: jsonData.siteSlug || '',
      favicon,
      logo,
      privacyUrl: jsonData.privacyPolicyUrl || '',
      companyUrl: (typeof jsonData.websiteUrl === 'string' ? jsonData.websiteUrl : jsonData.websiteUrl?.url) || '',
      footerWebsiteText: jsonData.websiteUrl?.footerWebsiteText || '',
    },
    homePage: {
      enabled: hasHomePage,
      hero: {
        title: jsonData.homeHeroTitle || '',
        image: heroImage,
      },
      infoSection: {
        enabled: hasInfoSection,
        showTitle: !!(jsonData.homeMainTitle),
        showDescription: !!(jsonData.homeMainDescription),
        title: jsonData.homeMainTitle || '',
        description: jsonData.homeMainDescription || '',
        cards: cards.length > 0
          ? cards.map((card, i) => ({
              id: `card-imported-${i + 1}`,
              title: card.title || '',
              description: card.description || '',
              image: cardImages[i] || null,
            }))
          : [{ id: 'card-imported-1', title: '', description: '', image: null }],
      },
    },
    jobList: {
      title: jsonData.jobListHeroTitle || '',
      description: jsonData.jobListHeroDescription || '',
      image: joblistImage,
    },
  }
}
