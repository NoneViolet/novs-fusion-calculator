import type { Shard } from "../shard/shard";
import type { FusionRecipe } from "./fusionRecipe";

export function getRecipesForOutput(
    recipes: FusionRecipe[],
    outputShardId: Shard["id"],
): FusionRecipe[] {
    return recipes.filter(
        (recipe) => recipe.outputShard === outputShardId,
    );
}