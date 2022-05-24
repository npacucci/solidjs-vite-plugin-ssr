import { Component, createSignal } from 'solid-js'
import './Counter.scss';

export interface CounterProps {
  name: string;
}

const Counter: Component<CounterProps> = (props: CounterProps) => {
  const [count, setCount] = createSignal(2);

  return (
    <button class="Counter-Btn" type="button" onClick={() => setCount((prev) => prev + 1)}>
      {props.name} {count()}
    </button>
  )
}

export default Counter;