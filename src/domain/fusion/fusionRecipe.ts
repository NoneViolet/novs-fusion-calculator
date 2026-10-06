import type { Shard } from "../shard/shard";

export type RecipeInput = {
    shardId: Shard["id"];
    amount: number;
};

export type FusionRecipe = {
    id: string;
    inputs: RecipeInput[];
    output: RecipeInput;
}