import { lazy } from 'solid-js';
import { hydrate } from 'solid-js/web'
import { getPage } from 'vite-plugin-ssr/client'
import { ClientRegistry } from '../components/csr-components.registry';
import { CsrComponent } from '../interfaces/csr-component.interface';

doHydrate();

async function doHydrate() {
  const pageContext = await getPage<any>();
  const csrComponents: CsrComponent[] = pageContext.csrComponents || [];

  if (csrComponents?.length) {
    csrComponents.forEach(async (comp: CsrComponent) => {
      const ssrComponent = document.getElementById(comp.id);
      if (ssrComponent) {
        const DynamicComponent = (await lazy(() => ClientRegistry[comp.name]()).preload()).default;
        hydrate(
          () => (
            <DynamicComponent {...(comp.params)} />
          ),
          ssrComponent
        )
      }
    })
  }
}