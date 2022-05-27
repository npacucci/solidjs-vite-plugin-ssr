import { lazy } from "solid-js";
import { DynamicImport } from "../types/dynamic-import.type";

export const dynamicImport = async (imports: {[key: string]: DynamicImport}, name: string) => (await lazy(() => imports[name]()).preload()).default;