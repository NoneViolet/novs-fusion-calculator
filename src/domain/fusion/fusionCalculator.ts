import type { BazaarPrice } from '../bazaar/bazaarPrice';
import type { FusionRecipe } from './fusionRecipe';
import type { InputOrderType, OutputOrderType } from '../bazaar/orderType';
import { getInputPrice, getOutputPrice } from '../bazaar/priceSelector';

export function calculateShardCost(
    recipe: FusionRecipe,
    prices: Map<string, BazaarPrice>,
    inputOrderType: InputOrderType,
): number {
    let cost = 0;

    for (const input of recipe.inputShards) {
        const price = prices.get(input);
        if (!price) {
            throw new Error(`Price not found: ${input}`);
        }

        const inputPrice = getInputPrice(price, inputOrderType);
        cost += inputPrice;
    }
    return cost / recipe.outputAmount;
}