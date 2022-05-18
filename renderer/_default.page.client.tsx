import { hydrate, render } from 'solid-js/web'
import { getPage } from 'vite-plugin-ssr/client'
import { PageLayout } from './PageLayout'

doHydrate();

async function doHydrate() {
  const content = document.getElementById('page-view');
  const pageContext = await getPage<any>();
  const { Page } = pageContext;

  hydrate(
    () => (
      <PageLayout>
        <Page {...pageContext.pageProps} />
      </PageLayout>
    ),
    content!,
  )
}