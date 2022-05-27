export interface Block {
    component: string;
    params: Object;
    ssr: boolean;
    csr: "hydrate" | "assets";
}