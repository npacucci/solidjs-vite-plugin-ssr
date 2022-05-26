import { DynamicImport } from "../lib/types/dynamic-import.type";
import { GlobalImports } from "./global.imports";

const CSRComponents: {[component: string]: DynamicImport} = {
    Clock: () => import("./clock/Clock"),
}

const SSRComponentsStyles: {[component: string]: DynamicImport} = {
    Title: () => import("./title/Title.scss")
}

export const ClientImports: {[component: string]: DynamicImport} = {
    ...GlobalImports,
    ...CSRComponents,
    ...SSRComponentsStyles
}