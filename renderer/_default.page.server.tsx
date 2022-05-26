import { generateHydrationScript, renderToString } from 'solid-js/web'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { PageContext } from './types'
import logoUrl from '/logo.svg'
import { CsrComponent } from '../interfaces/csr-component.interface';
import config from '../pages/pages.config.json';
import { ServerRegistry } from '../components/ssr-components.registry';
import { lazy } from 'solid-js';

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

async function render(pageContext: PageContext) {
  const { Page, pageProps, pageLayoutConfig } = pageContext;
  let DynamicPageContent: string;

  if (pageLayoutConfig) {
    const results = await Promise.all(pageLayoutConfig.map(async (comp: any, i: number) => {
      const {component, params, csr, ssr} = comp;
      const id: string = `comp-${i.toString()}`;
      let ssrComponent: string = '';
      if (ssr) {
        const DynamicComponent = (await lazy(() => ServerRegistry[component]()).preload()).default;
        ssrComponent = renderToString(() => <DynamicComponent {...params} />);
      }
      if (csr) {
        csrComponents.push({id: id, name: component, params: params} as CsrComponent);
      }
      return `
      <div id="${id}">
        ${ssrComponent}
      </div>
      `;
    }));

    DynamicPageContent = results.join('');
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
