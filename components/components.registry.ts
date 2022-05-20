import { Component } from "solid-js";
import { Clock } from "./clock/Clock";
import { Counter } from "./counter/Counter";

export const ComponentRegistry: {[key: string]: Component<any>} = {
    Counter,
    Clock
}