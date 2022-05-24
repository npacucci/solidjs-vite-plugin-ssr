import { DynamicImport } from "./dynamic-import.type";

export const UniversalComponents: {[key: string]: DynamicImport} = {
    Counter: () => import("./counter/Counter")
}