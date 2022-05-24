import { UniversalComponents } from "./universal-components.registry";
import { DynamicImport } from "./dynamic-import.type";

const CSRComponents: {[key: string]: DynamicImport} = {
    Clock: () => import("./clock/Clock")
}

export const ClientRegistry: {[key: string]: DynamicImport} = {
    ...UniversalComponents,
    ...CSRComponents
}