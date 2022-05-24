import { Component, lazy } from "solid-js";
import { DynamicImport } from "./dynamic-import.type";

export interface DynamicComponentProps {
    registry: {[key: string]: DynamicImport};
    name: string;
    params: any;
}


export const DynamicComponent: Component<DynamicComponentProps> = (props: DynamicComponentProps) => {
    const {registry, name, params} = props;
    const ComponentInstance = lazy(() => registry[name]());
    return <ComponentInstance {...(params)} /> 
};