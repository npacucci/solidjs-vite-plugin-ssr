import { Component, createSignal } from 'solid-js'
import './Counter.scss';

export interface CounterProps {
  name?: string;
  start?: number;
}

const Counter: Component<CounterProps> = (props: CounterProps) => {
  const { name, start } = props;
  const [count, setCount] = createSignal(start ?? 2);

  return (
    <button class="Counter-Btn" type="button" onClick={() => setCount((prev) => prev + 1)}>
      {name} {count()}
    </button>
  )
}

export default Counter;