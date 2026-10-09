import type { RawFusionData } from "./fusionData";

export interface FusionDataLoader {
    load(): Promise<RawFusionData>;
}