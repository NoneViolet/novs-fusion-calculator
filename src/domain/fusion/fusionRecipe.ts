import type { Shard } from "../shard/shard";

export type FusionRecipe = {
    inputShards: Shard["id"][];
    outputShard: Shard["id"];
    outputAmount: number;
}