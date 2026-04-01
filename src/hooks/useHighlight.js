import { useRef, useEffect } from 'react'

/**
 * Hook for preview section highlighting.
 * Returns a ref to attach to the highlightable element.
 * Adds/removes the active class and scrolls into view when active.
 */
export function useHighlight(focusArea, zone) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.setAttribute('data-highlight-zone', zone)

    if (focusArea === zone) {
      el.classList.add('preview-highlight-active')
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    } else {
      el.classList.remove('preview-highlight-active')
    }
  }, [focusArea, zone])

  return ref
}
