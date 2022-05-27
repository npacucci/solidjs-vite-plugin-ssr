export interface ComponentSettings {
    render: Render;
}

export enum Render {
    SSR,
    SSRNoStyle,
    CSR,
    Universal
}