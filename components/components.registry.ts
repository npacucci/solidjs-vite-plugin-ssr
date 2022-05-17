import { Component } from "solid-js";
import { Counter } from "./counter/Counter";

export const ComponentRegistry: {[key: string]: Component<any>} = {
    Counter
}