export {};

declare global {
    interface Window {
        electronAPI: {
            loadFusionData: () => Promise<unknown>;
        };
    }
}