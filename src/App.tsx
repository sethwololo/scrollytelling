import { Clock, User } from 'lucide-solid'
import { type Component, For } from 'solid-js'

import data from './assets/timings.json'
import { Card } from './components/Card'
import { useScrollingVideo } from './hooks/useScrollingVideo'
import { getRelativeTimeString } from './utils/getRelativeTimeString'

const creationDatetime = new Date('2024-07-31T08:00')

export const App: Component = () => {
  let containerRef!: HTMLDivElement
  let videoRef!: HTMLVideoElement

  useScrollingVideo(() => videoRef)

  const handleLoadedMetadata = () => {
    // Depende do tamanho do vídeo
    containerRef!.style.height = `${videoRef.duration * 25}svh` // 50svh para cada segundo
  }

  return (
    <main class="max-w-full width-full bg-stone-50">
      <article class="px-4">
        <header class="bg-stone-50 w-full">
          <div class="max-w-screen-xl mx-auto px-8 py-32">
            <h1 class="text-6xl font-bold text-stone-800 mb-4">Lorem Ipsum</h1>

            <p class="text-lg max-w-prose leading-relaxed text-stone-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel eros urna. Vivamus dictum viverra quam, nec dictum nisi
              convallis a. Nunc metus arcu, faucibus ac rutrum sed, malesuada
              quis magna. Nunc molestie est at sem ornare, ut aliquet sapien
              posuere. Quisque volutpat lacus ligula, eu vestibulum est
              condimentum quis.
            </p>

            <div class="flex items-center gap-4 mt-4  text-stone-700 text-sm">
              <div class="flex items-center gap-2 ">
                <User size={18} class="text-stone-800" aria-hidden={true} />
                <span>sethwololo</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock size={18} class="text-stone-800" aria-hidden={true} />
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
          class="max-w-screen-xl mx-auto relative rounded-[3rem] overflow-visible bg-black"
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
            {({ timestamp, text }) => (
              <Card.Root
                class="absolute ml-4"
                style={{ top: `${timestamp * 25}svh` }}
              >
                <Card.Text>{text}</Card.Text>
              </Card.Root>
            )}
          </For>
        </section>

        <footer class="relative bg-stone-50">
          <div class="px-8 w-full py-32 max-w-screen-xl mx-auto flex flex-col gap-2 items-center ">
            <p class="text-md text-stone-600 max-w-prose">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel eros urna. Vivamus dictum viverra quam, nec dictum nisi
              convallis a. Nunc metus arcu, faucibus ac rutrum sed, malesuada
              quis magna. Nunc molestie est at sem ornare, ut aliquet sapien
              posuere. Quisque volutpat lacus ligula, eu vestibulum est
              condimentum quis.
            </p>

            <span class="text-sm text-stone-600">Video by Apple Inc.</span>
          </div>
        </footer>
      </article>
    </main>
  )
}
