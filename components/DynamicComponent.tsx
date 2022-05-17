import { Component } from "solid-js";
import { ComponentRegistry } from "./components.registry";

export interface DynamicComponentProps {
    name: string;
    params: any;
}

export const DynamicComponent: Component<DynamicComponentProps> = (props: DynamicComponentProps) => {
    const {name, params} = props;
    const ComponentInstance = ComponentRegistry[name];
    return <ComponentInstance {...(params)} /> 
};