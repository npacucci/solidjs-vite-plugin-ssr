import { Component, createSignal, onMount } from 'solid-js'
import { isServer } from 'solid-js/web';
import { CounterParams } from './Counter.params';

export { Counter }

const Counter: Component<CounterParams> = (props: CounterParams) => {
  const [count, setCount] = createSignal(2);


  if (isServer) {
    onMount(() => console.log('Counter mounted'));
  }

  return (
    <button type="button" onClick={() => setCount((prev) => prev + 1)}>
      Counter {props.name} {count()}
    </button>
  )
}
