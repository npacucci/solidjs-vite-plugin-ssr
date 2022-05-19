import { Component, createSignal } from 'solid-js'
import { BaseComponentProps } from '../../interfaces/base-component-props.interface';
import './Counter.scss';
export { Counter }

export interface CounterProps extends BaseComponentProps {
  name: string;
}

const Counter: Component<CounterProps> = (props: CounterProps) => {
  const [count, setCount] = createSignal(2);

  return (
    <button id={props.id} class="Counter-Btn" type="button" onClick={() => setCount((prev) => prev + 1)}>
      Counter {props.name} {count()}
    </button>
  )
}
