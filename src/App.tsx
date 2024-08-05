import { Clock, User } from 'lucide-solid'
import { type Component, For, onMount } from 'solid-js'

import data from './assets/timings.json'
import { Card } from './components/Card'
import { useVideoScroll } from './hooks/useVideoScroll'
import { getRelativeTimeString } from './utils/getRelativeTimeString'

const creationDatetime = new Date('2024-07-31T08:00')

export const App: Component = () => {
  let containerRef!: HTMLDivElement
  let videoRef!: HTMLVideoElement

  const handleLoadedMetadata = () => {
    // Depende do tamanho do vídeo
    containerRef!.style.height = `${Math.floor(videoRef.duration) * 200}px` //  para cada segundo
  }

  onMount(() => {
    useVideoScroll(videoRef)
  })

  return (
    <main class="max-w-full width-full bg-stone-50">
      <article class="px-4">
        <header class="bg-stone-50 w-full min-h-[55svh]">
          <div class="max-w-screen-xl mx-auto px-8 py-32">
            <h1 class="text-4xl sm:text-6xl font-bold text-stone-800 mb-4 ">
              Scrollytelling Demo
            </h1>

            <p class="text-lg max-w-prose leading-relaxed text-stone-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel eros urna. Vivamus dictum viverra quam, nec dictum nisi
              convallis a. Nunc metus arcu, faucibus ac rutrum sed, malesuada
              quis magna. Nunc molestie est at sem ornare, ut aliquet sapien
              posuere. Quisque volutpat lacus ligula, eu vestibulum est
              condimentum quis.
            </p>

            <div class="flex items-center gap-4 mt-4 text-stone-700 text-sm">
              <div class="flex items-center gap-2 ">
                <User size={18} aria-hidden={true} />
                <span>sethwololo</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock size={18} aria-hidden={true} />
                <span>
                  <time datetime={creationDatetime.toISOString()}>
                    {getRelativeTimeString(creationDatetime)}
                  </time>
                </span>
              </div>
            </div>
          </div>
        </header>

        <section
          id="content"
          class="max-w-screen-xl mx-auto relative rounded-[3rem] overflow-visible bg-black border-2 border-black"
          ref={containerRef}
        >
          <div class="sticky top-0 w-full bg-green overflow-hidden rounded-[3rem] h-svh bg-black">
            <video
              aria-hidden={true}
              ref={videoRef}
              muted
              playsinline
              preload="auto"
              // @ts-expect-error: Esse atributo existe e está listado no MDN
              disablepictureinpicture
              disableremoteplayback
              onLoadedmetadata={handleLoadedMetadata}
              class="h-full max-h-svh max-w-full object-contain"
            >
              <source
                src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <For each={data}>
            {({ timestamp, text, title }) => (
              <Card.Root
                class="absolute even:left-3 odd:right-3 md:odd:right-6 md:even:left-6"
                style={{ top: `${Math.floor(timestamp * 200)}px` }}
              >
                {title && <Card.Title>{title}</Card.Title>}
                <Card.Text>{text}</Card.Text>
              </Card.Root>
            )}
          </For>
        </section>

        <footer class="relative bg-stone-50">
          <div class="px-8 w-full min-h-[55svh] pt-40 pb-30 max-w-screen-xl mx-auto flex flex-col gap-4 items-center ">
            <p class="text-md text-stone-500 max-w-prose">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel eros urna. Vivamus dictum viverra quam, nec dictum nisi
              convallis a. Nunc metus arcu, faucibus ac rutrum sed, malesuada
              quis magna. Nunc molestie est at sem ornare, ut aliquet sapien
              posuere. Quisque volutpat lacus ligula, eu vestibulum est
              condimentum quis.
            </p>

            <span class="text-sm text-stone-500">Video by Apple Inc.</span>
          </div>
        </footer>
      </article>
    </main>
  )
}
