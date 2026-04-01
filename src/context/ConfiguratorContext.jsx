import { createContext, useContext, useReducer, useCallback } from 'react'

const ConfiguratorContext = createContext(null)

let cardIdCounter = 1
function generateCardId() {
  return `card-${cardIdCounter++}`
}

const initialState = {
  instanceId: null,
  instanceName: null,
  currentStep: 0,
  exported: false,
  dirty: false,

  general: {
    siteName: '',
    urlSlug: '',
    favicon: null,
    logo: null,
    privacyUrl: '',
    companyUrl: '',
  },

  homePage: {
    enabled: true,
    hero: {
      title: '',
      image: null,
    },
    infoSection: {
      enabled: false,
      showTitleDescription: false,
      title: '',
      description: '',
      cards: [{ id: generateCardId(), title: '', description: '', image: null }],
    },
  },

  jobList: {
    title: '',
    description: '',
    image: null,
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INSTANCE':
      return { ...state, instanceId: action.payload.id, instanceName: action.payload.name, dirty: true }

    case 'SET_STEP':
      return { ...state, currentStep: action.payload }

    case 'UPDATE_GENERAL':
      return { ...state, general: { ...state.general, ...action.payload }, dirty: true }

    case 'UPDATE_HOMEPAGE':
      return { ...state, homePage: { ...state.homePage, ...action.payload }, dirty: true }

    case 'UPDATE_HERO':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          hero: { ...state.homePage.hero, ...action.payload },
        },
        dirty: true,
      }

    case 'UPDATE_INFO_SECTION':
      return {
        ...state,
        homePage: {
          ...state.homePage,
          infoSection: { ...state.homePage.infoSection, ...action.payload },
        },
        dirty: true,
      }

    case 'UPDATE_CARD': {
      const cards = state.homePage.infoSection.cards.map((c) =>
        c.id === action.payload.id ? { ...c, ...action.payload.data } : c
      )
      return {
        ...state,
        homePage: {
          ...state.homePage,
          infoSection: { ...state.homePage.infoSection, cards },
        },
        dirty: true,
      }
    }

    case 'ADD_CARD': {
      const cards = [
        ...state.homePage.infoSection.cards,
        { id: generateCardId(), title: '', description: '', image: null },
      ]
      return {
        ...state,
        homePage: {
          ...state.homePage,
          infoSection: { ...state.homePage.infoSection, cards },
        },
        dirty: true,
      }
    }

    case 'REMOVE_CARD': {
      const cards = state.homePage.infoSection.cards.filter((c) => c.id !== action.payload)
      return {
        ...state,
        homePage: {
          ...state.homePage,
          infoSection: { ...state.homePage.infoSection, cards },
        },
        dirty: true,
      }
    }

    case 'UPDATE_JOBLIST':
      return { ...state, jobList: { ...state.jobList, ...action.payload }, dirty: true }

    case 'SET_EXPORTED':
      return { ...state, exported: true }

    case 'SET_DIRTY':
      return { ...state, dirty: action.payload }

    case 'LOAD_STATE':
      return { ...action.payload, dirty: false }

    default:
      return state
  }
}

const STORAGE_KEY = 'configurator-draft'

function serializeFileToBase64(fileObj) {
  if (!fileObj || !fileObj.file) return fileObj
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve({ name: fileObj.name, size: fileObj.size, type: fileObj.type, dataUrl: reader.result })
    }
    reader.readAsDataURL(fileObj.file)
  })
}

function deserializeFile(obj) {
  if (!obj || !obj.dataUrl) return obj
  return { name: obj.name, size: obj.size, type: obj.type, dataUrl: obj.dataUrl, file: null }
}

async function serializeState(state) {
  const s = JSON.parse(JSON.stringify(state, (key, val) => {
    if (key === 'file' && val instanceof File) return undefined
    return val
  }))

  const processFile = async (obj) => {
    if (obj && obj.file instanceof File) return await serializeFileToBase64(obj)
    if (obj && obj.dataUrl) return obj
    return obj
  }

  s.general.favicon = await processFile(state.general.favicon)
  s.general.logo = await processFile(state.general.logo)
  s.homePage.hero.image = await processFile(state.homePage.hero.image)
  s.jobList.image = await processFile(state.jobList.image)

  for (let i = 0; i < s.homePage.infoSection.cards.length; i++) {
    s.homePage.infoSection.cards[i].image = await processFile(
      state.homePage.infoSection.cards[i].image
    )
  }

  return s
}

function deserializeState(s) {
  s.general.favicon = deserializeFile(s.general.favicon)
  s.general.logo = deserializeFile(s.general.logo)
  s.homePage.hero.image = deserializeFile(s.homePage.hero.image)
  s.jobList.image = deserializeFile(s.jobList.image)
  s.homePage.infoSection.cards = s.homePage.infoSection.cards.map((c) => ({
    ...c,
    image: deserializeFile(c.image),
  }))
  return s
}

export function ConfiguratorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return deserializeState(parsed)
      }
    } catch (e) {
      console.warn('Failed to load draft:', e)
    }
    return initialState
  })

  const saveDraft = useCallback(async () => {
    try {
      const serialized = await serializeState(state)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized))
      dispatch({ type: 'SET_DIRTY', payload: false })
    } catch (e) {
      console.error('Failed to save draft:', e)
    }
  }, [state])

  return (
    <ConfiguratorContext.Provider value={{ state, dispatch, saveDraft }}>
      {children}
    </ConfiguratorContext.Provider>
  )
}

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext)
  if (!ctx) throw new Error('useConfigurator must be used within ConfiguratorProvider')
  return ctx
}
