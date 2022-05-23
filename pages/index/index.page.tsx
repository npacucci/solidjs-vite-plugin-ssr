import { Component } from 'solid-js'
import { DynamicComponent } from '../../components/DynamicComponent'

const Page: Component = () => {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
      </ul>
    </>
  )
}

export { Page }
