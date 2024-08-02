import { makeEventListener } from '@solid-primitives/event-listener'
import createRAF, { targetFPS } from '@solid-primitives/raf'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'

import { clamp } from '../utils/clamp'

export const useVideoScroll = (videoRef: HTMLVideoElement) => {
  const [videoVisible, setVideoVisible] = createSignal(false)
  const [isScrolling, setIsScrolling] = createSignal(false)

  const [, start, stop] = createRAF(
    targetFPS(() => {
      const progressInSeconds = Number(
        clamp(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
            videoRef.duration,
          0,
          videoRef.duration,
        ).toFixed(2),
      )

      videoRef.currentTime = progressInSeconds
    }, 30),
  )

  const observer = new IntersectionObserver(
    (entries) => {
      const isVisible = entries[0].isIntersecting
      setVideoVisible(isVisible)
    },
    { threshold: 0.52 },
  )

  createEffect(() => {
    if (isScrolling() && videoVisible()) {
      start()
    } else {
      stop()
    }
  })

  makeEventListener(window, 'scroll', () => {
    setIsScrolling(true)
  })
  makeEventListener(window, 'scrollend', () => {
    setIsScrolling(false)
  })

  onMount(() => observer.observe(videoRef))
  onCleanup(() => observer.unobserve(videoRef))
}
