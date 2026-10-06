import type { Shard } from "../shard/shard";

export type RecipeInput = {
    shard: Shard["id"];
    amount: number;
};

export type FusionRecipe = {
    id: string;
    inputs: RecipeInput[];
    output: RecipeInput;
}