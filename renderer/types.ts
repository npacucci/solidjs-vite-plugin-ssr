import { Component } from 'solid-js'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { CsrComponent } from '../interfaces/csr-component.interface'
export type PageProps = {}
export type PageContext = PageContextBuiltIn & {
  Page: (pageProps: PageProps) => Component
  pageProps: PageProps
  documentProps?: {
    title?: string
    description?: string
  }
  pageLayoutConfig: any;
  csrComponents: CsrComponent[]
}
