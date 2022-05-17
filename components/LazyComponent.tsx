import { Component, lazy } from "solid-js";

export const LazyComponent: Component<{name: string, params: any}> = (props: {name: string, params: any}) => {
    const {name, params} = props;
    const ComponentInstance = lazy(() => import(`./${name}`));

    return <ComponentInstance {...params} />
}