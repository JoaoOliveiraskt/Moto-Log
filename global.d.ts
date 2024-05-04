import { PropsWithChildren, LabelHTMLAttributes } from 'react'

declare module "@radix-ui/react-label" {
  export type PropsWithLabelElement<P = unknown > = P & LabelHTMLAttributes
  export interface LabelProps extends PropsWithChildren, PropsWithLabelElement {}
}