import { hydrate } from 'solid-js/web'
import { getPage } from 'vite-plugin-ssr/client'
import { ClientImports } from '../components/client.imports';
import { CsrComponent } from '../lib/interfaces/csr-component.interface';
import { dynamicImport } from '../lib/utils/dynamic-import.util';

Main();

async function Main() {
  const pageContext = await getPage<any>();
  const csrComponents: CsrComponent[] = pageContext.csrComponents || [];

  if (csrComponents?.length) {
    csrComponents.forEach(async (comp: CsrComponent) => {
      const {name, id , params} = comp;
      // If id, hydration of this host is needed.
      if (id) {
        const ssrHost = document.getElementById(id);
        if (ssrHost) {
          const DynamicComponent = await dynamicImport(ClientImports, name);
          hydrate(
            () => (
              <DynamicComponent {...(params)} />
            ),
            ssrHost
          )
        }
      }
      else {
        // Just need to fetch the assets of this component.
        ClientImports[name]();
      }
    })
  }
}