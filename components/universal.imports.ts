import { DynamicImport } from "../lib/types/dynamic-import.type";

export const UniversalImports: {[component: string]: DynamicImport} = {
    Counter: () => import("./counter/Counter"),
}