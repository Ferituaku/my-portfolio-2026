/** Track the in-flow area that exposes a background, including fixed layers. */
export function observeMotion(
  area: Element,
  onActive: (active: boolean) => void,
  prepare?: () => void,
) {
  let visible = false
  let near = false
  let prepared = false
  let active = false

  function sync() {
    if (!document.hidden && (near || visible) && !prepared) {
      prepared = true
      prepare?.()
      proximity?.disconnect()
    }
    const next = visible && !document.hidden
    if (next !== active) {
      active = next
      onActive(active)
    }
  }

  const proximity = prepare ? new IntersectionObserver(([entry]) => {
    near = entry.isIntersecting
    sync()
  }, { rootMargin: '320px 0px' }) : null
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRect.height > 0
    sync()
  }, { threshold: [0, 0.00001] })

  proximity?.observe(area)
  visibility.observe(area)
  document.addEventListener('visibilitychange', sync)
  return () => {
    proximity?.disconnect()
    visibility.disconnect()
    document.removeEventListener('visibilitychange', sync)
    if (active) onActive(false)
  }
}

export function observeVideo(area: Element, video: HTMLVideoElement, src: string, onActive?: (active: boolean) => void) {
  let active = false
  function play() {
    if (active && !document.hidden && video.paused) void video.play().catch(() => {})
  }
  const disconnect = observeMotion(area, next => {
    active = next
    onActive?.(next)
    if (active) play()
    else video.pause()
  }, () => {
    if (!video.hasAttribute('src')) video.src = src
  })
  window.addEventListener('pointerup', play)
  window.addEventListener('keydown', play)
  return () => {
    disconnect()
    window.removeEventListener('pointerup', play)
    window.removeEventListener('keydown', play)
  }
}
