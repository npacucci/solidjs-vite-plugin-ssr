import { DynamicImport } from "../lib/types/dynamic-import.type";
import { UniversalImports } from "./universal.imports";

const SSRComponents: {[component: string]: DynamicImport} = {
    Title: () => import("./title/Title")
}

export const ServerImports: {[component: string]: DynamicImport} = {
    ...UniversalImports,
    ...SSRComponents
}