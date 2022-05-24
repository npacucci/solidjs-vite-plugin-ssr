import { UniversalComponents } from "./universal-components.registry";
import { DynamicImport } from "./dynamic-import.type";

const SSRComponents: {[key: string]: DynamicImport} = {
    Title: () => import("./title/Title")
}

export const ServerRegistry: {[key: string]: DynamicImport} = {
    ...UniversalComponents,
    ...SSRComponents
}