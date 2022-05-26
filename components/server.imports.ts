import { DynamicImport } from "../lib/types/dynamic-import.type";
import { GlobalImports } from "./global.imports";

const SSRComponents: {[component: string]: DynamicImport} = {
    Title: () => import("./title/Title")
}

export const ServerImports: {[component: string]: DynamicImport} = {
    ...GlobalImports,
    ...SSRComponents
}