import { Component, lazy } from "solid-js";

export const LazyComponent: Component<{name: string, params: any}> = (props: {name: string, params: any}) => {
    const {name, params} = props;
    const ComponentInstance = lazy(() => import(/* @vite-ignore */ `./${name}`));
    return <ComponentInstance {...params} />
}