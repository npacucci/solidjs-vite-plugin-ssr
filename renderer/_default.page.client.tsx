import { hydrate } from 'solid-js/web'
import { getPage } from 'vite-plugin-ssr/client'
import { ClientRegistry } from '../components/csr-components.registry';
import { DynamicComponent } from '../components/DynamicComponent';
import { CsrComponent } from '../interfaces/csr-component.interface';

doHydrate();

async function doHydrate() {
  const pageContext = await getPage<any>();
  const csrComponents: CsrComponent[] = pageContext.csrComponents || [];

  if (csrComponents?.length) {
    csrComponents.forEach((comp: CsrComponent) => {
      const ssrComponent = document.getElementById(comp.id);
      if (ssrComponent) {
        hydrate(
          () => (
            <DynamicComponent registry={ClientRegistry} name={comp.name} params={{...comp.params}} />
          ),
          ssrComponent
        )
      }
    })
  }
}