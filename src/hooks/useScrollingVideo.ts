import { makeEventListener } from '@solid-primitives/event-listener'
import { throttle } from '@solid-primitives/scheduled'
import { createSignal, onMount } from 'solid-js'

import { clamp } from '../utils/clamp'
import { lerp } from '../utils/lerp'

export function useScrollingVideo(videoRef: () => HTMLVideoElement) {
  const [videoVisible, setVideoVisible] = createSignal(false)
  const [targetTime, setTargetTime] = createSignal(0)
  const [currentTime, setCurrentTime] = createSignal(0)

  const observer = new IntersectionObserver(
    (entries) => {
      setVideoVisible(entries[0].isIntersecting)
    },
    { threshold: 0.5 },
  )

  function updateCurrentTime() {
    if (!videoRef() || !videoVisible()) return

    const t = 0.2 // Esse valor controla a velocidade de interpolação
    const newTime = Number(lerp(currentTime(), targetTime(), t).toFixed(2))

    if (Math.abs(newTime - targetTime()) < 0.01) {
      setCurrentTime(targetTime())
    } else {
      setCurrentTime(newTime)
      videoRef()!.currentTime = newTime
      requestAnimationFrame(updateCurrentTime)
    }
  }

  function playVideo() {
    if (!videoRef() || !videoVisible()) return

    const scrollFactor = clamp(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        videoRef()!.duration,
      0,
      videoRef()!.duration,
    )

    // videoRef()!.currentTime = scrollFactor
    setTargetTime(scrollFactor)
    requestAnimationFrame(updateCurrentTime)
  }

  onMount(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    if (videoRef()) {
      observer.observe(videoRef()!)
    }
    // Esse event listener é removido automaticamente quando o componente é desmontado
    makeEventListener(window, 'scroll', throttle(playVideo, 16.666)) // 16.666ms = 60fps
  })
}
