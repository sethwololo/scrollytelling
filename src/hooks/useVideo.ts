import { onMount } from 'solid-js'

import { clamp } from '../utils/clamp'

export function useVideo(
  containerRef: HTMLDivElement,
  videoRef: HTMLVideoElement,
) {
  function updateVideoTime() {
    const containerTop =
      containerRef.getBoundingClientRect().top + window.scrollY
    const containerHeight = containerRef.clientHeight
    const scrollPosition = window.scrollY - containerTop
    const maxScroll = containerHeight - window.innerHeight

    const progressInSeconds = Number(
      clamp(
        (scrollPosition / maxScroll) * videoRef.duration,
        0,
        videoRef.duration,
      ).toFixed(3),
    )

    videoRef.currentTime = progressInSeconds
  }

  function initVideo() {
    videoRef.preload = 'auto'
    videoRef.muted = true
    videoRef.disablePictureInPicture = true
    videoRef.disableRemotePlayback = true
    videoRef.controls = false
    videoRef.playsInline = true

    videoRef.pause()
    videoRef.load()
  }

  onMount(() => {
    initVideo()
  })

  return { updateVideoTime }
}
