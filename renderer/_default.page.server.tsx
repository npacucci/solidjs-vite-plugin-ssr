import { generateHydrationScript, renderToString } from 'solid-js/web'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageContext } from './types'
import logoUrl from '/logo.svg'
import { CsrComponent } from '../interfaces/csr-component.interface';
import config from '../pages/pages.config.json';
import { DynamicComponent } from '../components/DynamicComponent';
import { ServerRegistry } from '../components/ssr-components.registry';

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
  let DynamicPageContent: string;

  if (pageLayoutConfig) {
    DynamicPageContent = pageLayoutConfig.map((comp: any, i: number) => {
      const id: string = `comp-${i.toString()}`;
      let ssrComponent: string = '';
      if (comp.ssr) {
        ssrComponent = renderToString(() => <DynamicComponent registry={ServerRegistry} name={comp.component} params={{...comp.params}} />)
      }
      if (comp.csr) {
        csrComponents.push({id: id, name: comp.component, params: comp.params} as CsrComponent);
      }
      return `
      <div id="${id}">
        ${ssrComponent}
      </div>
      `;
    }).join(''); 
  }

  const pageHtml = renderToString(() => (
    <Page>
      <div innerHTML={DynamicPageContent} />
    </Page>
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
