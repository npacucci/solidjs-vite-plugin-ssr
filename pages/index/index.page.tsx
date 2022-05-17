import { Component } from 'solid-js'
import { DynamicComponent } from '../../components/DynamicComponent'

const Page: Component = () => {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <DynamicComponent name="Counter" params={{name: 'test'}} />
        </li>
      </ul>
    </>
  )
}

export { Page }
