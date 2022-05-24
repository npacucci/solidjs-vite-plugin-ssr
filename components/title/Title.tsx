import { Component } from 'solid-js'

export interface TitleProps {
  title: string;
}

const Title: Component<TitleProps> = (props: TitleProps) => {
  return (
    <h1 class="headline">{props.title}</h1>
  )
}

export default Title;