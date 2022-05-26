import { Component } from 'solid-js';
import { isServer } from "solid-js/web";
import './Title.scss';

export interface TitleProps {
  title: string;
}

const Title: Component<TitleProps> = (props: TitleProps) => {
  if (isServer) {
    return (
      <h1 class="Title headline">{props.title}</h1>
    )
  }
}

export default Title;