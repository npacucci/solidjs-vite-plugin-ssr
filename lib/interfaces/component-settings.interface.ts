export interface ComponentSettings {
    render: RenderTypes;
}

export enum RenderTypes {
    SSR,
    SSRNoStyle,
    CSR,
    Universal
}