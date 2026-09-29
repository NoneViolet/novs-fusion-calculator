import type { BazaarPrice } from '../bazaar/bazaarPrice';
import type { FusionRecipe } from './fusionRecipe';
import type { FusionResult } from './fusionResult';
import type { InputOrderType, OutputOrderType } from '../bazaar/orderType';
import { getInputPrice, getOutputPrice } from '../bazaar/priceSelector';

type FusionCalculationOptions = {
    inputOrderType: InputOrderType
    outputOrderType: OutputOrderType
}

export function calculateFusionProfit(
    recipe: FusionRecipe,
    prices: Map<string, BazaarPrice>,
    options: FusionCalculationOptions
): FusionResult {
    let cost = 0;

    for(const input of recipe.inputs) {
        const price = prices.get(input.itemId);

        if (!price){
            throw new Error(`Price not found: ${input.itemId}`);
        }
        const inputPrice = getInputPrice(price, options.inputOrderType);
        cost += inputPrice * input.amount;
    }

    const outputPrice = prices.get(recipe.output.itemId);

    if(!outputPrice) {
        throw new Error(`Price not found: ${recipe.output.itemId}`)
    }
    const outputUnitPrice = getOutputPrice(outputPrice, options.outputOrderType);
    
    const revenue = outputUnitPrice * recipe.output.amount;
    const profit = revenue - cost;
    const roi = cost === 0 ? 0 : profit/cost;

    return {
        recipeId: recipe.id,
        cost,
        revenue,
        profit,
        roi
    }
}
