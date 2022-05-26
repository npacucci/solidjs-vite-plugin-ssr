import { DynamicImport } from "../lib/types/dynamic-import.type";

export const GlobalImports: {[component: string]: DynamicImport} = {
    Counter: () => import("./counter/Counter"),
}