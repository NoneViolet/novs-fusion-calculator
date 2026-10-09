import type { FusionRecipe } from "../../domain/fusion/fusionRecipe";
import type { RawFusionData } from "./fusionData";

export function mapFusionRecipes(
    data: RawFusionData,
): FusionRecipe[] {
    const recipes: FusionRecipe[] = [];

    for (const [outputShard, amounts] of Object.entries(data.recipes)) {
        for (const [outputAmount, inputShardsList] of Object.entries(amounts)) {
            for (const inputShards of inputShardsList) {
                recipes.push({
                    inputShards,
                    outputShard,
                    outputAmount: Number(outputAmount),
                });
            }
        }
    }

    return recipes;
}