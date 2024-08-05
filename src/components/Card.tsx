import { type Component, type JSX } from 'solid-js'

import { cn } from '../utils/cn'

const Root: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      class={cn(
        'px-4 max-w-[320px] py-4 bg-stone-100 rounded-3xl',
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
        'text-md max-w-prose leading-normal text-stone-700',
        ...(props.class || ''),
      )}
    >
      {props.children}
    </p>
  )
}

const Title: Component<JSX.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <h2
      {...props}
      class={cn(
        'text-2xl font-bold leading-relaxed text-stone-700',
        ...(props.class || ''),
      )}
    >
      {props.children}
    </h2>
  )
}

export const Card = { Root, Text, Title }
