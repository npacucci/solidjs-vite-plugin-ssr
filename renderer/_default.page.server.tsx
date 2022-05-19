import { generateHydrationScript, renderToString } from 'solid-js/web'
import { PageLayout } from './PageLayout'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageContext } from './types'
import logoUrl from './logo.svg'
import { CsrComponent } from '../interfaces/csr-component.interface';
import config from '../pages/pages.config.json';
import { DynamicComponent } from '../components/DynamicComponent'
import { For } from 'solid-js'

export { render }
export { passToClient }
export { onBeforeRender }

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ['pageProps', 'documentProps', 'csrComponents'];
let csrComponents: CsrComponent[] = [];

async function onBeforeRender(pageContext: PageContext) {
  const pageLayoutConfig = config.find((c) => c.url === pageContext.url)?.layout;
  csrComponents = [];

  return {
    pageContext: {
      pageLayoutConfig,
      csrComponents
    }
  }
}

function render(pageContext: PageContext) {
  const { Page, pageProps, pageLayoutConfig } = pageContext;

  const DynamicPageContent =  () => <For each={pageLayoutConfig}>{(comp: any, i) => {
    const id: string = `comp-${i().toString()}`;
    if (comp.isCsr) {
      csrComponents.push({id: id, name: comp.component, params: comp.params} as CsrComponent);
    }
    return (
      <DynamicComponent name={comp.component} params={{id: id, ...comp.params}} />
    )
  }
  }</For>;
  
  const pageHtml = renderToString(() => (
    <PageLayout>
      <DynamicPageContent />
    </PageLayout>
  ))

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const description = (documentProps && documentProps.description) || 'App using Vite + vite-plugin-ssr'

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`
}
