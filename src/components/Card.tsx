import { type Component, type JSX } from 'solid-js'

import { cn } from '../utils/cn'

const Root: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      class={cn(
        'px-4 max-w-[320px] py-8 bg-stone-50 rounded-2xl',
        props.class || '',
      )}
    >
      {props.children}
    </div>
  )
}

const Text: Component<JSX.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  return (
    <p
      {...props}
      class={cn(
        'text-lg max-w-prose leading-relaxed text-stone-800',
        ...(props.class || ''),
      )}
    >
      {props.children}
    </p>
  )
}

export const Card = { Root, Text }
