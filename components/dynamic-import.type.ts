import { Component } from "solid-js";

export type DynamicImport = () => Promise<{ default: Component<any> }>;