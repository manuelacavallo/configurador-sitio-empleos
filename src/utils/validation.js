export function validateStep(step, state) {
  const errors = {}

  if (step === 0) {
    if (!state.general.siteName.trim()) errors['general.siteName'] = 'Campo obligatorio'
    if (!state.general.urlSlug.trim()) errors['general.urlSlug'] = 'Campo obligatorio'
    if (!state.general.logo) errors['general.logo'] = 'Campo obligatorio'
    if (!state.general.privacyUrl.trim()) errors['general.privacyUrl'] = 'Campo obligatorio'
  }

  if (step === 1 && state.homePage.enabled) {
    if (!state.homePage.hero.title.trim()) errors['homePage.hero.title'] = 'Campo obligatorio'
    if (!state.homePage.hero.image) errors['homePage.hero.image'] = 'Campo obligatorio'

    if (state.homePage.infoSection.enabled) {
      state.homePage.infoSection.cards.forEach((card, i) => {
        if (!card.image) errors[`homePage.infoSection.cards.${i}.image`] = 'Campo obligatorio'
        if (!card.title.trim()) errors[`homePage.infoSection.cards.${i}.title`] = 'Campo obligatorio'
        if (!card.description.trim()) errors[`homePage.infoSection.cards.${i}.description`] = 'Campo obligatorio'
      })
    }
  }

  if (step === 2) {
    // No required fields — title and description have defaults
  }

  return errors
}

export function validateAllSteps(state) {
  return {
    step0: validateStep(0, state),
    step1: validateStep(1, state),
    step2: validateStep(2, state),
  }
}

export function isStepComplete(step, state) {
  const errors = validateStep(step, state)
  return Object.keys(errors).length === 0
}

export function isStepDisabled(step, state) {
  if (step === 1) return !state.homePage.enabled
  return false
}

export function isInfoCardComplete(card) {
  return !!(card.image && card.title?.trim() && card.description?.trim())
}

export function isStepFullyComplete(step, state) {
  if (isStepDisabled(step, state)) return false
  if (!isStepComplete(step, state)) return false

  if (step === 0) {
    return !!(state.general.siteName && state.general.urlSlug && state.general.logo && state.general.privacyUrl && state.general.favicon && state.general.companyUrl)
  }

  if (step === 1) {
    if (!state.homePage.enabled) return false
    const hasHero = !!(state.homePage.hero.title && state.homePage.hero.image)
    if (!hasHero) return false
    if (!state.homePage.infoSection.enabled) return false
    const allCards = state.homePage.infoSection.cards.every(c => c.image && c.title && c.description)
    if (!allCards) return false
    return true
  }

  if (step === 2) {
    return !!(state.jobList.title && state.jobList.description && state.jobList.image)
  }

  return false
}
