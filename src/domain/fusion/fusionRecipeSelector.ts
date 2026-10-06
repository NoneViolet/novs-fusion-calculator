import type { FusionRecipe } from "./fusionRecipe";

export function getRecipesForOutput(
    recipes: FusionRecipe[],
    outputItemId: string,
): FusionRecipe[] {
    return recipes.filter(
        (recipe) => recipe.output.shard === outputItemId,
    );
}