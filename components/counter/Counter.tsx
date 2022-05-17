import { Component, createSignal, onMount } from 'solid-js'
import { isServer } from 'solid-js/web';
import './Counter.scss';
export { Counter }

export interface CounterProps {
  name: string;
}

const Counter: Component<CounterProps> = (props: CounterProps) => {
  const [count, setCount] = createSignal(2);


  if (isServer) {
    onMount(() => console.log('Counter mounted'));
  }

  return (
    <button class="Counter-Btn" type="button" onClick={() => setCount((prev) => prev + 1)}>
      Counter {props.name} {count()}
    </button>
  )
}
