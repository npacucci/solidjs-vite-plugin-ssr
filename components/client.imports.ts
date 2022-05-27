import { DynamicImport } from "../lib/types/dynamic-import.type";
import { UniversalImports } from "./universal.imports";

const CSRComponents: {[component: string]: DynamicImport} = {
    Clock: () => import("./clock/Clock"),
}

const SSRComponentsStyles: {[component: string]: DynamicImport} = {
    Title: () => import("./title/Title.scss")
}

export const ClientImports: {[component: string]: DynamicImport} = {
    ...UniversalImports,
    ...CSRComponents,
    ...SSRComponentsStyles
}