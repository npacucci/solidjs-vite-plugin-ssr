import { Component } from 'solid-js'
import { Counter } from './Counter'

const Page: Component = () => {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter name="Demo" />
        </li>
      </ul>
    </>
  )
}

export { Page }
