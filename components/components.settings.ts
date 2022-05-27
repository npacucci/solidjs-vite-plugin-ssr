import { ComponentSettings } from "../lib/interfaces/component-settings.interface";
import { ClockSettings } from "./clock/Clock.settings";
import { CounterSettings } from "./counter/Counter.settings";
import { TitleSettings } from "./title/Title.settings";

export const ComponentsSettings: {[component: string]: ComponentSettings} = {
    Title: TitleSettings,
    Counter: CounterSettings,
    Clock: ClockSettings
}