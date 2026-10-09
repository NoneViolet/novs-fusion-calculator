import type { RawFusionData } from "./fusionData";
import type { FusionDataLoader } from "./fusionDataLoader";

export class JsonFusionDataLoader implements FusionDataLoader {
    async load(): Promise<RawFusionData> {
        throw new Error("Not implemented");
    }
}