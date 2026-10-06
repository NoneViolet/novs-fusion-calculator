import type { BazaarPrice } from "../bazaar/bazaarPrice";
import type { InputOrderType } from "../bazaar/orderType";
import { getInputPrice } from "../bazaar/priceSelector";
import type { Shard } from "../shard/shard";
import type { FusionRecipe } from "./fusionRecipe";

export function calculateShardCost(
    recipe: FusionRecipe,
    shards: Map<string, Shard>,
    prices: Map<string, BazaarPrice>,
    inputOrderType: InputOrderType,
): number {
    let cost = 0;

    for (const inputShardId of recipe.inputShards) {
        const shard = shards.get(inputShardId);

        if (!shard) {
            throw new Error(`Shard not found: ${inputShardId}`);
        }

        const price = prices.get(shard.hypixelId);

        if (!price) {
            throw new Error(`Price not found: ${shard.hypixelId}`);
        }

        const inputPrice = getInputPrice(price, inputOrderType);
        cost += inputPrice * shard.fuseAmount;
    }

    return cost / recipe.outputAmount;
}