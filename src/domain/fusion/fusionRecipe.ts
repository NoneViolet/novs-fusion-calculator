import type { Item } from "../item/item";

export type RecipeInput = {
    itemId: Item["id"];
    amount: number;
};

export type FusionRecipe = {
    id: string;
    inputs: RecipeInput[];
    output: RecipeInput;
}