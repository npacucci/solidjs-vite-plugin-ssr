import { lazy } from "solid-js";
import { DynamicImport } from "../types/dynamic-import.type";

export const dynamicImport = async (registry: {[key: string]: DynamicImport}, name: string) => (await lazy(() => registry[name]()).preload()).default;